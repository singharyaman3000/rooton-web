import crypto from 'crypto';

function correctPadding(base64String) {
  if (!base64String) return base64String;
  return base64String + '='.repeat((4 - (base64String.length % 4)) % 4);
}

export function encryptWithAES(text, secretKey) {
  if (!text || !secretKey) {
    throw new Error('Text or secretKey is undefined');
  }

  const iv = crypto.randomBytes(16);
  const key = Buffer.from(correctPadding(secretKey), 'base64');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return iv.toString('base64') + encrypted;
}

// export function decryptWithAES(ciphertext, secretKey) {
//   if (!ciphertext || !secretKey || ciphertext.length < 24) {
//     throw new Error('Ciphertext is too short or secretKey is undefined');
//   }

//   const iv = Buffer.from(ciphertext.slice(0, 24), 'base64');
//   const encryptedText = ciphertext.slice(24);

//   if (!iv || encryptedText.length === 0) {
//     throw new Error('Invalid ciphertext format');
//   }

//   const key = Buffer.from(correctPadding(secretKey), 'base64');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

//   let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
//   decrypted += decipher.final('utf8');

//   return decrypted;
// }
