"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const port = parseInt(process.env.PORT || '4000', 10);
const mongoKey = process.env.MONGO_KEY || 'localhost:27017/KaiKaiBlog';
exports.config = {
    port,
    mongoKey,
};
exports.default = exports.config;
//# sourceMappingURL=index.js.map