/**
 * @file encryp.js
 * @description 加密解密方法
 * @lastModifiedTime 2020-11-24 17:17:23
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

/**
 * 私钥解密
 */
const privateDecrypt = (password) => {
  const private_key = fs.readFileSync(path.resolve(__dirname, './ssl_key/rsa_private_key.pem'));

  const result = crypto.privateDecrypt({
    key: private_key,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }, Buffer.from(password, 'base64'));

  return result
}

exports.privateDecrypt = privateDecrypt
