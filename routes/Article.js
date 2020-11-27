/**
 * @file 文章路由
 * @lastModifiedTime 2019-10-29 11:48:39
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const { ArticleModel } = require('../models')
const { checkVarIsEmpty } = require('../util/common.js')

module.exports =  (router) => {
  router.get('/api/Article', async (ctx, next) => {
    console.log(ctx.request.query.id, 'ctx.request.query.id')
    let results = {}
    if(checkVarIsEmpty(ctx.request.query.id) === true) {
      results = await ArticleModel.find()
    } else {
      results = await ArticleModel.find({_id: ctx.request.query.id})
    }

    let code = 0;
    let msg = '查询成功啦~'
    ctx.body = {
      code: code,
      msg: msg,
      data: results
    }
  });

  router.post('/api/Article/Add', async (ctx, next) => {
    let date = new Date();
    let dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`


    let code = 0;
    let msg = ''
    try {
      const article = new ArticleModel({
        title: ctx.request.body.title,
        description: ctx.request.body.description,
        content: ctx.request.body.content,
        createtime: dateFormat,
        cover: ctx.request.body.cover
      })
      await article.save();
      code = 0
      msg = '添加成功了哦';
    } catch (error) {
      code = 1;
      msg = '添加失败了哦';
    }
    ctx.body = {
      code: code,
      msg: msg
    }
  });

  router.put('/api/Article/Edit', async (ctx, next) => {
    let code = 0;
    let msg = '修改成功啦~'
    let date = new Date();
    let dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`
    await ArticleModel.updateOne({_id: ctx.request.body.id}, {
      $set: {
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        description: ctx.request.body.description,
        cover: ctx.request.body.cover,
        updatetime: dateFormat
      }
    })
    ctx.body = {
      code: code,
      msg: msg
    }
  });

  router.delete('/api/Article/Delete/', async (ctx, next) => {
    await ArticleModel.deleteOne({_id: ctx.request.query.id}, (err) => {
      if (err) {
        ctx.body = {
          code: 1,
          msg:'删除失败了T-T.',
          data: err
        }
      } else {
        ctx.body = {
          code: 0,
          msg:'删除成功咯. ^_^'
        }
      }
    })
  })
}
