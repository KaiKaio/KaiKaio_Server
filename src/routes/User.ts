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
      const jwtUtil = new JwtUtil(String(_id));
      const accessToken = jwtUtil.generateAccessToken();
      const refreshToken = jwtUtil.generateRefreshToken();

      // save refresh token in DB with expiry
      const refreshExpiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      resultUser.refreshToken = refreshToken;
      resultUser.refreshTokenExpires = refreshExpiry;
      await resultUser.save();

      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: '登录成功',
        accessToken,
        refreshToken,
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

  // Refresh access token
  router.post('/api/user/refresh', async (ctx: Context) => {
    try {
      const { refreshToken } = ctx.request.body as { refreshToken: string };
      if (!refreshToken) throw new Error('缺少 refreshToken');

      const decoded = JwtUtil.verifyToken(refreshToken);
      if (!decoded || decoded.type !== 'refresh') throw new Error('refreshToken 无效');

      const userid = decoded.userid;
      const user = await UserModel.findById(userid).exec();
      if (!user) throw new Error('用户不存在');

      if (!user.refreshToken || user.refreshToken !== refreshToken)
        throw new Error('refreshToken 不匹配');
      if (user.refreshTokenExpires && user.refreshTokenExpires.getTime() < Date.now())
        throw new Error('refreshToken 已过期');

      // rotate tokens
      const jwtNew = new JwtUtil(String(userid));
      const newAccessToken = jwtNew.generateAccessToken();
      const newRefreshToken = jwtNew.generateRefreshToken();
      user.refreshToken = newRefreshToken;
      user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await user.save();

      ctx.status = 200;
      ctx.body = { code: 0, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.log(error, 'refresh 失败原因');
      ctx.status = 401;
      ctx.body = { code: 401, msg: '刷新 token 失败' };
    }
  });

  // Logout - revoke refresh token
  router.post('/api/user/logout', async (ctx: Context) => {
    try {
      const { refreshToken } = ctx.request.body as { refreshToken: string };
      if (!refreshToken) throw new Error('缺少 refreshToken');

      const decoded = JwtUtil.verifyToken(refreshToken);
      if (!decoded || decoded.type !== 'refresh') throw new Error('refreshToken 无效');

      const userid = decoded.userid;
      const user = await UserModel.findById(userid).exec();
      if (!user) throw new Error('用户不存在');

      // clear stored refresh token
      user.refreshToken = undefined;
      user.refreshTokenExpires = undefined;
      await user.save();

      ctx.status = 200;
      ctx.body = { code: 0, msg: '已登出' };
    } catch (error) {
      console.log(error, 'logout 失败原因');
      ctx.status = 400;
      ctx.body = { code: 400, msg: '登出失败' };
    }
  });
};
