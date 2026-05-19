"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    createtime: { type: String, required: true },
    updatetime: { type: String, required: false },
    albumart: { type: String, required: false },
});
exports.default = VideoSchema;
//# sourceMappingURL=VideoSchema.js.map