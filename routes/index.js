/**
 * @file 路由入口（整合所有路由）
 * @lastModifiedTime 2019-10-29 11:48:22
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const Article_Routes = require('./Article') // 文章相关路由
const Music_Routes = require('./Music') // 文章相关路由
const Background_Routes = require('./Background') // 文章相关路由

module.exports =  (router) => {
  // 首页入口
  router.get('/', async (ctx, next) => {
    ctx.state = {
      title: 'Hello World Koa2'
    }
    await ctx.render('index', ctx.state)
  });

  Article_Routes(router);
  Music_Routes(router);
  Background_Routes(router);
}
