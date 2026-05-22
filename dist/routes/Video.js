"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.default = (router) => {
    router.get('/api/Video', async (ctx) => {
        const results = await models_1.VideoModel.find();
        const code = 0;
        const msg = '查询视频成功啦~';
        ctx.body = {
            code: code,
            msg: msg,
            data: results,
        };
    });
    router.post('/api/Video/Add', async (ctx) => {
        const date = new Date();
        const dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`;
        const body = ctx.request.body;
        const video = new models_1.VideoModel({
            title: body.title,
            url: body.url,
            albumart: body.albumart,
            createtime: dateFormat,
        });
        let code = 0;
        let msg = '';
        try {
            await video.save();
            msg = '添加视频成功';
        }
        catch {
            code = 1;
            msg = '添加视频失败';
        }
        ctx.body = {
            code: code,
            msg: msg,
        };
    });
    router.delete('/api/Video/Delete/', async (ctx) => {
        const query = ctx.request.query;
        console.log(query.id);
        await models_1.VideoModel.deleteOne({ _id: query.id })
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
};
//# sourceMappingURL=Video.js.map