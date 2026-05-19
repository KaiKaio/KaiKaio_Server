import crypto from 'crypto';

/**
 * 私钥解密
 */
export const privateDecrypt = (password: string): Buffer => {
  const privateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
  console.log(privateKey, '=> private_key');
  const result = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(password, 'base64')
  );

  return result;
};
