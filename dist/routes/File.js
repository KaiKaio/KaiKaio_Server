"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ali_oss_1 = __importDefault(require("ali-oss"));
const OSSClient = new ali_oss_1.default({
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
    region: 'oss-cn-beijing',
    authorizationV4: true,
    bucket: 'kaikai-bloga',
});
exports.default = (router) => {
    router.get('/api/listBuckets', async (ctx) => {
        try {
            const code = 0;
            const msg = '查询背景成功啦~';
            const result = await OSSClient.list({ 'max-keys': 100 }, {});
            ctx.body = {
                code: code,
                msg: msg,
                data: result,
            };
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
    });
};
//# sourceMappingURL=File.js.map