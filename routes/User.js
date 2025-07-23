/**
 * @file Music.js
 * @lastModifiedTime 2020-01-06 17:49:21
 * @author KaiKaio <https://github.com/KaiKaio>
*/
const fs = require("fs");
const path = require("path");

const { UserModel } = require('../models')
const { privateDecrypt } = require('../util/encryp.js')
// 引入jwt token工具
const JwtUtil = require('../util/jwt.js');

const public_key = fs.readFileSync(
  path.join(__dirname, "../util/ssl_key/rsa_public_key.pem"), 'utf-8'
);

module.exports =  (router) => {
  router.post('/api/user/login', async (ctx, next) => {
    try {
      const { userName, password } = ctx.request.body;

      const resultUser = await UserModel.findOne({'username': userName}).exec();
      if(resultUser === null) {
        throw new Error('该用户未存在')
      }

      const clientPass = privateDecrypt(password)
      const serverPass = privateDecrypt(resultUser.password)

      if(!(clientPass.toString() === serverPass.toString())){
        throw new Error('密码错误')
      }

      // 登录成功，添加token验证
      const _id = resultUser._id;
      // 将用户id传入并生成token
      const jwt = new JwtUtil(_id);
      const token = jwt.generateToken();

      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '登录成功',
        token: token
      }

    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '登录失败'
      }
      next(error)
    }
  });

  router.post('/api/user/register', async (ctx, next) => {

  });

  router.get('/api/user/verifyToken', async (ctx, next) => {
    try {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '校验通过'
      }
    } catch {
      next(e)
    }
  });

  router.get('/api/user/public_key', async (ctx, next) => {
    try {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: public_key
      }
    } catch {
      next(e)
    }
  })
}
