/**
 * @file 路由入口（整合所有路由）
 * @lastModifiedTime 2019-10-29 11:48:22
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const AddArticle_Routes = require('./AddArticle') // 文章相关路由

module.exports =  (router) => {
  // 首页入口
  router.get('/', async (ctx, next) => {
    ctx.state = {
      title: 'Hello World Koa2'
    }
    await ctx.render('index', ctx.state)
  });

  AddArticle_Routes(router);
}
