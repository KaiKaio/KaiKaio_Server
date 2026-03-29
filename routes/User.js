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
      console.log(error, '登录失败原因')
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '登录失败'
      }
      next(error)
    }
  });

  router.post('/api/user/register', async (ctx, next) => {
    try {
      const { userName, password } = ctx.request.body;

      // 检查用户是否已存在
      const existingUser = await UserModel.findOne({'username': userName}).exec();
      if(existingUser !== null) {
        throw new Error('用户名已存在')
      }

      // 创建新用户
      const newUser = new UserModel({
        username: userName,
        password: password
      });

      // 保存用户到数据库
      const savedUser = await newUser.save();

      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: '注册成功',
        _id: savedUser._id
      };

    } catch (error) {
      console.log(error, '注册失败原因');
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: error.message || '注册失败'
      };
      next(error);
    }
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
