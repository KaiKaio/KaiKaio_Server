const { CommentModel } = require('../models')
const { getUserIp } = require('../util/common')

module.exports =  (router) => {

  router.get('/api/Comment', async (ctx, next) => {
    const results = await CommentModel.find();
    const code = 0;
    const msg = '查询留言列表成功啦~'
    ctx.body = {
      code: code,
      msg: msg,
      data: results
    }
  });

  router.post('/api/Comment/Add', async (ctx, next) => {
    const { agent, content } = ctx.request.body;

    const req = ctx.req;

    const ip = getUserIp(req);
    console.log(ip, 'ip')
    return;

    const Comment = new CommentModel({
      url: ctx.request.body.url,
    })



    let code = 0;
    let msg = ''
    try {
      await Comment.save();
      msg = '添加留言成功';
    } catch (error) {
      code = 1;
      msg = '添加留言失败';
    }
    ctx.body = {
      code: code,
      msg: msg
    }
  })

  router.delete('/api/Comment/Delete/', async (ctx, next) => {
    await CommentModel.deleteOne({_id: ctx.request.query.id}, (err) => {
      if (err) {
        ctx.body = {
          code: 1,
          msg:'删除留言失败了T-T.',
          data: err
        }
      } else {
        ctx.body = {
          code: 0,
          msg:'删除留言成功咯. ^_^'
        }
      }
    })
  })
}
