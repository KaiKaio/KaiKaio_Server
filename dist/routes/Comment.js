"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
const common_1 = require("../util/common");
const AMapKey = process.env.AMAP_KEY || '';
exports.default = (router) => {
    router.get('/api/Comment', async (ctx) => {
        const results = await models_1.CommentModel.find();
        const code = 0;
        const msg = '查询留言列表成功啦~';
        ctx.body = {
            code: code,
            msg: msg,
            data: results,
        };
    });
    router.post('/api/Comment/Add', async (ctx) => {
        let code = 0;
        let msg = '';
        let result = null;
        const date = new Date();
        try {
            const body = ctx.request.body;
            const { content, pid, userName, site, email } = body;
            const { req } = ctx;
            const agent = ctx.get('user-agent') || ctx.request.headers['user-agent'] || '';
            const ip = (0, common_1.getUserIp)(req);
            const response = await axios_1.default.get(`https://restapi.amap.com/v5/ip?key=${AMapKey}&type=4&ip=${ip}`);
            const { status, info, province, district, country } = response.data;
            console.log(response.data);
            if (status !== '1' || info !== 'OK') {
                throw new Error('地址获取失败');
            }
            let ip_location = '';
            if (province) {
                ip_location = `${province}`;
            }
            if (country) {
                ip_location = ip_location + ` - ${country}`;
            }
            if (district) {
                ip_location = ip_location + ` - ${district}`;
            }
            const CommentItem = new models_1.CommentModel({
                content,
                agent,
                userName,
                site,
                email,
                pid,
                ip_location,
                createDate: `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`,
            });
            result = await CommentItem.save();
            msg = '添加留言成功';
        }
        catch (err) {
            console.log(err);
            code = 1;
            msg = '添加留言失败： ->' + err;
        }
        finally {
            ctx.body = {
                code,
                result,
                msg,
            };
        }
    });
    router.delete('/api/Comment/Delete/', async (ctx) => {
        const query = ctx.request.query;
        await models_1.CommentModel.deleteOne({ _id: query.id })
            .then(() => {
            ctx.body = {
                code: 0,
                msg: '删除留言成功咯. ^_^',
            };
        })
            .catch((err) => {
            ctx.body = {
                code: 1,
                msg: '删除留言失败了T-T.',
                data: err,
            };
        });
    });
};
//# sourceMappingURL=Comment.js.map