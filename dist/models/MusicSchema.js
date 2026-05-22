"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MusicSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    singer: { type: String, required: false },
    lrc: { type: String, required: false },
    createtime: { type: String, required: true },
    updatetime: { type: String, required: false },
    delname: { type: String, required: true },
    albumart: { type: String, required: false },
    sortIndex: { type: Number, required: true },
});
exports.default = MusicSchema;
//# sourceMappingURL=MusicSchema.js.map