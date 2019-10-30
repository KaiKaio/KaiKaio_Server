/**
 * @file 文章路由
 * @lastModifiedTime 2019-10-29 11:48:39
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const { ArticleModel } = require('../models')

module.exports =  (router) => {
  router.get('/api/Article/', async (ctx, next) => {
    const results = await ArticleModel.find();
    let code = 0;
    let msg = '查询成功啦~'
    ctx.body = {
      code:code,
      msg: msg,
      data: results
    }
  });

  router.post('/api/Article/Add', async (ctx, next) => {
    let date = new Date();
    let dateFormat = `${date.getFullYear().toString()}-${date.getMonth().toString()}-${date.getDate().toString()}`

    const article = new ArticleModel({
      title: ctx.request.body.title,
      description: ctx.request.body.description,
      content: ctx.request.body.content,
      createtime: dateFormat
    })
    let code = 0;
    let msg = ''
    try {
      await article.save();
      msg = '添加成功';
    } catch (error) {
      code = 1;
      msg = '添加失败';
    }
    ctx.body = {
      code:code,
      msg: msg
    }
  });
}
