"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.default = (router) => {
    router.get('/api/Music', async (ctx) => {
        const results = await models_1.MusicModel.find().sort({ sortIndex: -1 });
        const code = 0;
        const msg = '查询音乐成功啦~';
        ctx.body = {
            code: code,
            msg: msg,
            data: results,
        };
    });
    router.post('/api/Music/Add', async (ctx) => {
        const date = new Date();
        const dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`;
        const body = ctx.request.body;
        let sortIndex = body.sortIndex;
        if (typeof sortIndex === 'undefined' || sortIndex === null) {
            const maxDoc = await models_1.MusicModel.findOne().sort({ sortIndex: -1 });
            sortIndex = maxDoc && typeof maxDoc.sortIndex === 'number' ? maxDoc.sortIndex + 1 : 0;
        }
        const music = new models_1.MusicModel({
            title: body.title,
            url: body.url,
            singer: body.singer,
            lrc: body.lrc,
            albumart: body.albumart,
            delname: body.delname,
            createtime: dateFormat,
            sortIndex: sortIndex,
        });
        let code = 0;
        let msg = '';
        try {
            await music.save();
            msg = '添加音乐成功';
        }
        catch {
            code = 1;
            msg = '添加音乐失败';
        }
        ctx.body = {
            code: code,
            msg: msg,
        };
    });
    router.post('/api/Music/Edit', async (ctx) => {
        const date = new Date();
        const dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`;
        const body = ctx.request.body;
        const id = body.id || body._id;
        if (!id) {
            ctx.body = {
                code: 1,
                msg: '缺少要修改的音乐 ID',
            };
            return;
        }
        const updateData = {
            updatetime: dateFormat,
            title: body.title,
            url: body.url,
            singer: body.singer,
            lrc: body.lrc,
            albumart: body.albumart,
            delname: body.delname,
        };
        if (typeof body.sortIndex !== 'undefined' && body.sortIndex !== null) {
            updateData.sortIndex = body.sortIndex;
        }
        let code = 0;
        let msg = '';
        try {
            await models_1.MusicModel.updateOne({ _id: id }, { $set: updateData });
            msg = '编辑音乐成功';
        }
        catch {
            code = 1;
            msg = '编辑音乐失败';
        }
        ctx.body = {
            code: code,
            msg: msg,
        };
    });
    router.delete('/api/Music/Delete/', async (ctx) => {
        const query = ctx.request.query;
        await models_1.MusicModel.deleteOne({ _id: query.id })
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
    router.post('/api/Music/Sort', async (ctx) => {
        let code = 0;
        let msg = '已成功修改排序~';
        try {
            const body = ctx.request.body;
            const { changeIDList } = body;
            const changeToList = [];
            changeIDList.reverse();
            for (let i = 0; i < changeIDList.length; i++) {
                const { _id, sortIndex } = changeIDList[i];
                if (i !== sortIndex) {
                    changeToList.push({
                        currentID: _id,
                        changeIndex: i,
                    });
                }
            }
            for (let i = changeToList.length - 1; i >= 0; i--) {
                const { currentID, changeIndex } = changeToList[i];
                await models_1.MusicModel.updateOne({ _id: currentID }, {
                    $set: {
                        sortIndex: changeIndex,
                    },
                });
            }
        }
        catch (err) {
            code = 1;
            msg = '修改排序失败~ =>' + err;
            console.log(err, '修改排序报错');
        }
        finally {
            ctx.body = {
                code,
                msg,
            };
        }
    });
};
//# sourceMappingURL=Music.js.map