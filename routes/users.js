module.exports =  (router) => {
  router.get('/user', async function (ctx, next) {
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      msg: '添加文章失败'
    }
  })
}
