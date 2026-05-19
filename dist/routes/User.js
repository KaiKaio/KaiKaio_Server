"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const encryp_1 = require("../util/encryp");
const jwt_1 = __importDefault(require("../util/jwt"));
const publicKey = process.env.JWT_PUBLIC_KEY ? process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : '';
exports.default = (router) => {
    router.post('/api/user/login', async (ctx) => {
        try {
            const { userName, password } = ctx.request.body;
            const resultUser = await models_1.UserModel.findOne({ username: userName }).exec();
            if (resultUser === null) {
                throw new Error('该用户未存在');
            }
            const clientPass = (0, encryp_1.privateDecrypt)(password);
            const serverPass = (0, encryp_1.privateDecrypt)(resultUser.password);
            if (!(clientPass.toString() === serverPass.toString())) {
                throw new Error('密码错误');
            }
            const _id = resultUser._id;
            const jwt = new jwt_1.default(String(_id));
            const token = jwt.generateToken();
            ctx.status = 200;
            ctx.body = {
                code: 0,
                msg: '登录成功',
                token: token,
            };
        }
        catch (error) {
            console.log(error, '登录失败原因');
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: '登录失败',
            };
        }
    });
    router.post('/api/user/register', async (ctx) => {
        try {
            const { userName, password } = ctx.request.body;
            const existingUser = await models_1.UserModel.findOne({ username: userName }).exec();
            if (existingUser !== null) {
                throw new Error('用户名已存在');
            }
            const newUser = new models_1.UserModel({
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
        }
        catch (error) {
            const err = error;
            console.log(err, '注册失败原因');
            ctx.status = 400;
            ctx.body = {
                code: 400,
                msg: err.message || '注册失败',
            };
        }
    });
    router.post('/api/user/changePassword', async (ctx) => {
        try {
            const { oldPassword, newPassword } = ctx.request.body;
            const userid = ctx.state.user.userid;
            const resultUser = await models_1.UserModel.findById(userid).exec();
            if (resultUser === null) {
                throw new Error('该用户未存在');
            }
            const clientPass = (0, encryp_1.privateDecrypt)(oldPassword);
            const serverPass = (0, encryp_1.privateDecrypt)(resultUser.password);
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
        }
        catch (error) {
            const err = error;
            console.log(err, '修改密码失败原因');
            ctx.status = 400;
            ctx.body = {
                code: 400,
                msg: err.message || '修改密码失败',
            };
        }
    });
    router.get('/api/user/verifyToken', async (ctx) => {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: '校验通过',
        };
    });
    router.get('/api/user/public_key', async (ctx) => {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: publicKey,
        };
    });
};
//# sourceMappingURL=User.js.map