"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    site: { type: String, required: false },
    email: { type: String, required: false },
    content: { type: String, required: true },
    createDate: { type: String, required: true },
    agent: { type: String, required: false },
    ip_location: { type: String, required: false },
    pid: { type: String, required: true },
});
exports.default = CommentSchema;
//# sourceMappingURL=CommentSchema.js.map