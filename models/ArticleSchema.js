const mongoose = require('mongoose')

// 文档（对象）约束
const ArticleSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  content: { type: String, require: true },
  createtime: { type: String, require: true },
  updatetime: { type: String, require: false},
  cover: {type: String, require: false}
})

module.exports = {
  ArticleSchema
}
