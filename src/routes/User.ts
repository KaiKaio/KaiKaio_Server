import { Router } from '@koa/router';
import { Context } from 'koa';

import { UserModel } from '../models';
import { privateDecrypt } from '../util/encryp';
import JwtUtil from '../util/jwt';

const publicKey = process.env.JWT_PUBLIC_KEY
  ? process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n')
  : '';

export default (router: Router): void => {
  router.post('/api/user/login', async (ctx: Context) => {
    try {
      const { userName, password } = ctx.request.body as { userName: string; password: string };

      const resultUser = await UserModel.findOne({ username: userName }).exec();
      if (resultUser === null) {
        throw new Error('该用户未存在');
      }

      const clientPass = privateDecrypt(password);
      const serverPass = privateDecrypt(resultUser.password);

      if (!(clientPass.toString() === serverPass.toString())) {
        throw new Error('密码错误');
      }

      const _id = resultUser._id;
      const jwt = new JwtUtil(String(_id));
      const token = jwt.generateToken();

      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: '登录成功',
        token: token,
      };
    } catch (error) {
      console.log(error, '登录失败原因');
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '登录失败',
      };
    }
  });

  router.post('/api/user/register', async (ctx: Context) => {
    try {
      const { userName, password } = ctx.request.body as { userName: string; password: string };

      const existingUser = await UserModel.findOne({ username: userName }).exec();
      if (existingUser !== null) {
        throw new Error('用户名已存在');
      }

      const newUser = new UserModel({
        username: userName,
        password: password,
      });

      const savedUser = await newUser.save();

      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: '注册成功',
        _id: savedUser._id,
      };
    } catch (error) {
      const err = error as Error;
      console.log(err, '注册失败原因');
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: err.message || '注册失败',
      };
    }
  });

  router.post('/api/user/changePassword', async (ctx: Context) => {
    try {
      const { oldPassword, newPassword } = ctx.request.body as {
        oldPassword: string;
        newPassword: string;
      };
      const userid = (ctx.state as { user: { userid: string } }).user.userid;

      const resultUser = await UserModel.findById(userid).exec();
      if (resultUser === null) {
        throw new Error('该用户未存在');
      }

      const clientPass = privateDecrypt(oldPassword);
      const serverPass = privateDecrypt(resultUser.password);

      if (!(clientPass.toString() === serverPass.toString())) {
        throw new Error('旧密码错误');
      }

      resultUser.password = newPassword;
      await resultUser.save();

      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: '修改密码成功',
      };
    } catch (error) {
      const err = error as Error;
      console.log(err, '修改密码失败原因');
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: err.message || '修改密码失败',
      };
    }
  });

  router.get('/api/user/verifyToken', async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: '校验通过',
    };
  });

  router.get('/api/user/public_key', async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: publicKey,
    };
  });
};
