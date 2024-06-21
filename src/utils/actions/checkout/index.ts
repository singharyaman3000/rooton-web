'use server';

import crypto from 'crypto';

// You should securely store this key and keep it secret
const ENCRYPTION_KEY = crypto
  .createHash('sha256')
  .update(String('your-encryption-key-here'))
  .digest('base64')
  .substr(0, 32); // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text: string) {
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

export { encrypt, decrypt };
