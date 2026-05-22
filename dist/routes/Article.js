"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const common_1 = require("../util/common");
exports.default = (router) => {
    router.get('/api/Article', async (ctx) => {
        let results = {};
        const query = ctx.request.query;
        if ((0, common_1.checkVarIsEmpty)(query.id)) {
            results = await models_1.ArticleModel.find().select('-content').sort({ createtime: -1 });
        }
        else {
            results = await models_1.ArticleModel.find({ _id: query.id });
        }
        const code = 0;
        const msg = '查询成功啦~';
        ctx.body = {
            code: code,
            msg: msg,
            data: results,
        };
    });
    router.post('/api/Article/Add', async (ctx) => {
        const date = new Date();
        const dateFormat = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        let code = 0;
        let msg = '';
        try {
            const body = ctx.request.body;
            const article = new models_1.ArticleModel({
                title: body.title,
                description: body.description,
                content: body.content,
                createtime: dateFormat,
                cover: body.cover,
            });
            await article.save();
            code = 0;
            msg = '添加成功了哦';
        }
        catch {
            code = 1;
            msg = '添加失败了哦';
        }
        ctx.body = {
            code: code,
            msg: msg,
        };
    });
    router.put('/api/Article/Edit', async (ctx) => {
        const code = 0;
        const msg = '修改成功啦~';
        const date = new Date();
        const dateFormat = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const body = ctx.request.body;
        await models_1.ArticleModel.updateOne({ _id: body.id }, {
            $set: {
                title: body.title,
                content: body.content,
                description: body.description,
                cover: body.cover,
                updatetime: dateFormat,
            },
        });
        ctx.body = {
            code: code,
            msg: msg,
        };
    });
    router.delete('/api/Article/Delete/', async (ctx) => {
        const query = ctx.request.query;
        await models_1.ArticleModel.deleteOne({ _id: query.id })
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
//# sourceMappingURL=Article.js.map