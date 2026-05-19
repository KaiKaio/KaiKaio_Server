"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
exports.default = (router) => {
    router.get('/api/Background', async (ctx) => {
        const results = await models_1.BackgroundModel.find();
        const code = 0;
        const msg = '查询背景成功啦~';
        ctx.body = {
            code: code,
            msg: msg,
            data: results,
        };
    });
    router.post('/api/Background/Add', async (ctx) => {
        const body = ctx.request.body;
        const background = new models_1.BackgroundModel({
            url: body.url,
        });
        let code = 0;
        let msg = '';
        try {
            await background.save();
            msg = '添加背景成功';
        }
        catch {
            code = 1;
            msg = '添加背景失败';
        }
        ctx.body = {
            code: code,
            msg: msg,
        };
    });
    router.delete('/api/Background/Delete/', async (ctx) => {
        const query = ctx.request.query;
        await models_1.BackgroundModel.deleteOne({ _id: query.id })
            .then(() => {
            ctx.body = {
                code: 0,
                msg: '删除成功咯. ^_^',
            };
        })
            .catch((err) => {
            ctx.body = {
                code: 1,
                msg: '删除失败了T-T.',
                data: err,
            };
        });
    });
    router.get('/api/fetchBingWallpaper', async (ctx) => {
        const res = await axios_1.default.get('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN');
        const responseImgs = res.data.images;
        ctx.body = {
            code: 0,
            msg: 'BingWallPaper Search Success ~',
            data: responseImgs,
        };
    });
};
//# sourceMappingURL=Background.js.map