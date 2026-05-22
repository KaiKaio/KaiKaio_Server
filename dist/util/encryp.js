"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateDecrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * 私钥解密
 */
const privateDecrypt = (password) => {
    const privateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
    console.log(privateKey, '=> private_key');
    const result = crypto_1.default.privateDecrypt({
        key: privateKey,
        padding: crypto_1.default.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(password, 'base64'));
    return result;
};
exports.privateDecrypt = privateDecrypt;
//# sourceMappingURL=encryp.js.map