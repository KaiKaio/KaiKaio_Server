const mongoose = require('mongoose')

/**
 * @file 用户 - 文档（对象）约束
 * @lastModifiedTime 2020-11-22 00:13:59
 * @author KaiKaio <https://github.com/KaiKaio>
*/
const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true }
})

module.exports = {
  UserSchema
}
