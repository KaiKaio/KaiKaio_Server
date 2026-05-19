import { Router } from '@koa/router';
import { Context } from 'koa';

import { MusicModel } from '../models';

export default (router: Router): void => {
  router.get('/api/Music', async (ctx: Context) => {
    const results = await MusicModel.find().sort({ sortIndex: -1 });
    const code = 0;
    const msg = '查询音乐成功啦~';
    ctx.body = {
      code: code,
      msg: msg,
      data: results,
    };
  });

  router.post('/api/Music/Add', async (ctx: Context) => {
    const date = new Date();
    const dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`;

    const body = ctx.request.body as {
      title: string;
      url: string;
      singer?: string;
      lrc?: string;
      albumart?: string;
      delname: string;
      sortIndex?: number;
    };

    let sortIndex = body.sortIndex;
    if (typeof sortIndex === 'undefined' || sortIndex === null) {
      const maxDoc = await MusicModel.findOne().sort({ sortIndex: -1 });
      sortIndex = maxDoc && typeof maxDoc.sortIndex === 'number' ? maxDoc.sortIndex + 1 : 0;
    }

    const music = new MusicModel({
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
    } catch {
      code = 1;
      msg = '添加音乐失败';
    }
    ctx.body = {
      code: code,
      msg: msg,
    };
  });

  router.post('/api/Music/Edit', async (ctx: Context) => {
    const date = new Date();
    const dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`;

    const body = ctx.request.body as {
      id?: string;
      _id?: string;
      title?: string;
      url?: string;
      singer?: string;
      lrc?: string;
      albumart?: string;
      delname?: string;
      sortIndex?: number;
    };

    const id = body.id || body._id;
    if (!id) {
      ctx.body = {
        code: 1,
        msg: '缺少要修改的音乐 ID',
      };
      return;
    }

    const updateData: Record<string, unknown> = {
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
      await MusicModel.updateOne({ _id: id }, { $set: updateData });
      msg = '编辑音乐成功';
    } catch {
      code = 1;
      msg = '编辑音乐失败';
    }
    ctx.body = {
      code: code,
      msg: msg,
    };
  });

  router.delete('/api/Music/Delete/', async (ctx: Context) => {
    const query = ctx.request.query as { id: string };
    await MusicModel.deleteOne({ _id: query.id })
      .then(() => {
        ctx.body = {
          code: 0,
          msg: '删除成功咯. ^_^',
        };
      })
      .catch(err => {
        ctx.body = {
          code: 1,
          msg: '删除失败了T-T.',
          data: err,
        };
      });
  });

  router.post('/api/Music/Sort', async (ctx: Context) => {
    let code = 0;
    let msg = '已成功修改排序~';
    try {
      const body = ctx.request.body as {
        changeIDList: Array<{ _id: string; sortIndex: number }>;
      };
      const { changeIDList } = body;
      const changeToList: Array<{ currentID: string; changeIndex: number }> = [];
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
        await MusicModel.updateOne(
          { _id: currentID },
          {
            $set: {
              sortIndex: changeIndex,
            },
          }
        );
      }
    } catch (err) {
      code = 1;
      msg = '修改排序失败~ =>' + err;
      console.log(err, '修改排序报错');
    } finally {
      ctx.body = {
        code,
        msg,
      };
    }
  });
};
