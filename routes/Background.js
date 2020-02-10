const { BackgroundModel } = require('../models')

module.exports =  (router) => {
  router.get('/api/Background/', async (ctx, next) => {
    const results = await BackgroundModel.find();
    let code = 0;
    let msg = '查询背景成功啦~'
    ctx.body = {
      code: code,
      msg: msg,
      data: results
    }
  });

  router.post('/api/Background/Add', async (ctx, next) => {
    const background = new BackgroundModel({
      url: ctx.request.body.url,
    })

    let code = 0;
    let msg = ''
    try {
      await background.save();
      msg = '添加背景成功';
    } catch (error) {
      code = 1;
      msg = '添加背景失败';
    }
    ctx.body = {
      code: code,
      msg: msg
    }
  })

  router.delete('/api/Background/Delete/', async (ctx, next) => {
    await BackgroundModel.deleteOne({_id: ctx.request.query.id}, (err) => {
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
