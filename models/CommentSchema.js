const mongoose = require('mongoose')

// 文档（对象）约束
const CommentSchema = new mongoose.Schema({
  content: { type: String, require: true }, // 内容
  createDate: { type: String, require: true }, // 创建时间
  agent: { type: String, require: true }, // 用户设备信息
  ip_location: { type: String, require: true }, // IP定位地址
})

module.exports = {
  CommentSchema
}
