'use server';

import crypto from 'crypto';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import axios from 'axios';

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
  let successUrl = `${process.env.NEXT_APP_BASE_URL}payment-success?session_id={CHECKOUT_SESSION_ID}`;
  let cancelUrl = `${process.env.NEXT_APP_BASE_URL}checkout?token=${token}`;
  if (lang) {
    successUrl = `${process.env.NEXT_APP_BASE_URL}${lang}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    cancelUrl = `${process.env.NEXT_APP_BASE_URL}${lang}/checkout?token=${token}`;
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
    if (session.payment_status === 'paid') {
      const invoicedata = await stripe.invoices.retrieve((session.invoice as string) || '');
      console.log(invoicedata);
    }

    return session;
  } catch (error) {
    return error;
  }
}

async function handleCustomStripePayment(amount: string, email: string) {
  return `hello world ${email} ${amount}`;
}

async function createRazorpayOrder(amount: number, email: string): Promise<string | null> {
  try {
    // create order
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        email,
      },
    });
    return order.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function verifyRazorpayPaymentStatus(data: {
  orderCreationId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<boolean> {
  try {
    const response = await axios.post(`${process.env.NEXT_SERVER_API_BASE_URL}/api/verify_payment`, data);
    if (response.status === 200) {
      return response.data.status;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// async function handleRazorpayPaymentSuccess(){

// }

export {
  encrypt,
  decrypt,
  handleStripPayment,
  handleStripePaymentSuccess,
  handleCustomStripePayment,
  createRazorpayOrder,
  verifyRazorpayPaymentStatus,
  // handleRazorpayPaymentSuccess,
};
