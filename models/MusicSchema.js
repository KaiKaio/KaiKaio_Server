const mongoose = require('mongoose')

// 文档（对象）约束
const MusicSchema = new mongoose.Schema({
  title: { type: String, require: true },
  url: { type: String, require: true },
  singer: { type: String, require: false },
  lrc: { type: String, require: false },
  createtime: { type: String, require: true },
  updatetime: { type: String, require: false },
  delname: { type: String, require: true },
  albumart: { type: String, require: false },
  sortIndex: { type: Number, require: true }, // 排序下标值
})

module.exports = {
  MusicSchema
}

