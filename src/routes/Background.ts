import axios from 'axios';
import { Router } from '@koa/router';
import { Context } from 'koa';

import { BackgroundModel } from '../models';

export default (router: Router): void => {
  router.get('/api/Background', async (ctx: Context) => {
    const results = await BackgroundModel.find();
    const code = 0;
    const msg = '查询背景成功啦~';
    ctx.body = {
      code: code,
      msg: msg,
      data: results,
    };
  });

  router.post('/api/Background/Add', async (ctx: Context) => {
    const body = ctx.request.body as { url: string };
    const background = new BackgroundModel({
      url: body.url,
    });

    let code = 0;
    let msg = '';
    try {
      await background.save();
      msg = '添加背景成功';
    } catch {
      code = 1;
      msg = '添加背景失败';
    }
    ctx.body = {
      code: code,
      msg: msg,
    };
  });

  router.delete('/api/Background/Delete/', async (ctx: Context) => {
    const query = ctx.request.query as { id: string };
    await BackgroundModel.deleteOne({ _id: query.id })
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

  router.get('/api/fetchBingWallpaper', async (ctx: Context) => {
    const res = await axios.get(
      'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN'
    );
    const responseImgs = res.data.images;

    ctx.body = {
      code: 0,
      msg: 'BingWallPaper Search Success ~',
      data: responseImgs,
    };
  });
};
