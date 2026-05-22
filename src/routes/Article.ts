import { Router } from '@koa/router';
import { Context } from 'koa';

import { ArticleModel } from '../models';
import { checkVarIsEmpty } from '../util/common';

export default (router: Router): void => {
  router.get('/api/Article', async (ctx: Context) => {
    let results = {};
    const query = ctx.request.query as { id?: string };
    if (checkVarIsEmpty(query.id)) {
      results = await ArticleModel.find().select('-content').sort({ createtime: -1 });
    } else {
      results = await ArticleModel.find({ _id: query.id });
    }

    const code = 0;
    const msg = '查询成功啦~';
    ctx.body = {
      code: code,
      msg: msg,
      data: results,
    };
  });

  router.post('/api/Article/Add', async (ctx: Context) => {
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    let code = 0;
    let msg = '';
    try {
      const body = ctx.request.body as {
        title: string;
        description: string;
        content: string;
        cover?: string;
      };
      const article = new ArticleModel({
        title: body.title,
        description: body.description,
        content: body.content,
        createtime: dateFormat,
        cover: body.cover,
      });
      await article.save();
      code = 0;
      msg = '添加成功了哦';
    } catch {
      code = 1;
      msg = '添加失败了哦';
    }
    ctx.body = {
      code: code,
      msg: msg,
    };
  });

  router.put('/api/Article/Edit', async (ctx: Context) => {
    const code = 0;
    const msg = '修改成功啦~';
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const body = ctx.request.body as {
      id: string;
      title: string;
      content: string;
      description: string;
      cover?: string;
    };
    await ArticleModel.updateOne(
      { _id: body.id },
      {
        $set: {
          title: body.title,
          content: body.content,
          description: body.description,
          cover: body.cover,
          updatetime: dateFormat,
        },
      }
    );
    ctx.body = {
      code: code,
      msg: msg,
    };
  });

  router.delete('/api/Article/Delete/', async (ctx: Context) => {
    const query = ctx.request.query as { id: string };
    await ArticleModel.deleteOne({ _id: query.id })
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
};
