const mongoose = require('mongoose')

// 文档（对象）约束
const CommentSchema = new mongoose.Schema({
  userName:{ type: String, require: true }, // 用户名
  site:{ type: String, require: false }, // 域名地址
  email:{ type: String, require: false }, // 邮箱
  content: { type: String, require: true }, // 内容
  createDate: { type: String, require: true }, // 创建时间
  agent: { type: String, require: false }, // 用户设备信息
  ip_location: { type: String, require: false }, // IP定位地址
  pid: { type: String, require: true },
})

module.exports = {
  CommentSchema
}
