"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Jwt {
    constructor(data) {
        this.data = data;
    }
    generateToken() {
        const userid = this.data;
        const JWT_EXPIRATION = 8 * 60 * 60;
        const cert = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
        const token = jsonwebtoken_1.default.sign({ userid }, cert, {
            expiresIn: JWT_EXPIRATION,
            algorithm: 'RS256',
        });
        return token;
    }
    static verifyToken(token) {
        try {
            const cert = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') || '';
            const decoded = jsonwebtoken_1.default.verify(token, cert, { algorithms: ['RS256'] });
            return decoded;
        }
        catch {
            return null;
        }
    }
}
exports.default = Jwt;
//# sourceMappingURL=jwt.js.map