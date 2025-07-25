/**
 * @file 路由入口（整合所有路由）
 * @lastModifiedTime 2019-10-29 11:48:22
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const Article_Routes = require('./Article') // 文章相关路由
const Music_Routes = require('./Music') // 文章相关路由
const Background_Routes = require('./Background') // 文章相关路由
const User_Routes = require('./User') // 用户相关路由
const Comment_Routes = require('./Comment') // 留言相关
const File_Routes = require('./File') // 留言相关

module.exports =  (router) => {
  // 首页入口
  router.get('/', async (ctx, next) => {
    ctx.state = {
      title: 'Koa2 Server For Kaikaio'
    }
    await ctx.render('index', ctx.state)
  });

  File_Routes(router);
  Article_Routes(router);
  Music_Routes(router);
  Background_Routes(router);
  User_Routes(router);
  Comment_Routes(router);
}
