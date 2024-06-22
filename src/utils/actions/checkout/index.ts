'use server';

import crypto from 'crypto';
import Stripe from 'stripe';

// You should securely store this key and keep it secret
const ENCRYPTION_KEY = crypto
  .createHash('sha256')
  .update(String('your-encryption-key-here'))
  .digest('base64')
  .substr(0, 32); // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

async function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

async function decrypt(text: string) {
  const textParts = text.split(':');
  const firstPart = textParts.shift();
  if (firstPart === undefined) {
    // Handle the case when the shift operation returns undefined
    throw new Error('Invalid input format');
  }
  const iv = Buffer.from(firstPart, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10', // Ensure you specify the correct API version
});

async function handleStripPayment(
  priceId: string,
  email: string,
  name: string,
  token: string | undefined,
  lang: string | undefined,
): Promise<{ status: boolean; payment_url: string | null; error: string | null }> {
  let successUrl = 'http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}';
  let cancelUrl = `http://localhost:3000/checkout?token=${token}`;
  if (lang) {
    successUrl = `http://localhost:3000/${lang}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    cancelUrl = `http://localhost:3000/${lang}/checkout?token=${token}`;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      automatic_tax: {
        enabled: true,
      },
      billing_address_collection: 'required',
      customer_creation: 'if_required',
      invoice_creation: {
        enabled: true,
      },
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return { status: true, payment_url: session.url, error: null };
  } catch (error) {
    return { status: false, payment_url: null, error: JSON.stringify(error) };
  }
}

async function handleStripePaymentSuccess(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    return error;
  }
}
export { encrypt, decrypt, handleStripPayment, handleStripePaymentSuccess };
