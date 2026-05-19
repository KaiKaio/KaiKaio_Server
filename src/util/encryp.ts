import crypto from 'crypto';

/**
 * 私钥解密 - 使用 OAEP padding
 */
export const privateDecrypt = (password: string): Buffer => {
  const privateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
  const buffer = Buffer.from(password, 'base64');

  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer
  );
};
