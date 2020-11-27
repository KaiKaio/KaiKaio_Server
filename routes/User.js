/**
 * @file Music.js
 * @lastModifiedTime 2020-01-06 17:49:21
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const { UserModel } = require('../models')
const { privateDecrypt } = require('../util/encryp.js')
// 引入jwt token工具
const JwtUtil = require('../util/jwt.js');

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

      // 登陆成功，添加token验证
      const _id = resultUser._id;
      // 将用户id传入并生成token
      const jwt = new JwtUtil(_id);
      const token = jwt.generateToken();

      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '登陆成功',
        token: token
      }

    } catch (e) {
      ctx.status = 401;
      console.log(e)
      next(e)
    }
  });
}
