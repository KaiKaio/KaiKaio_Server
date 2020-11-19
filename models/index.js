/**
 * @file 包含 N 个操作数据库集合数据的 Model 模块
 * @lastModifiedTime 2019-10-29 11:13:19
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const mongoose = require('mongoose')
const { mongoKey } = require('../config/mongoConfig')

// ES6原生的Promise库
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongoKey}`,{useNewUrlParser: true,useUnifiedTopology: true})

// 如果连接失败会执行error回调
mongoose.connection.on("error", (error) => {
  console.log("DB数据库连接失败：" + error);
});
// 如果连接成功会执行open回调
mongoose.connection.on("open",  () => {
  console.log("DB数据库连接成功");
});

// 文档（对象）约束
const ArticleSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  content: { type: String, require: true },
  createtime: { type: String, require: true },
  updatetime: { type: String, require: false},
  cover: {type: String, require: false}
})

// 文档（对象）约束
const MusicSchema = new mongoose.Schema({
  title: { type: String, require: true },
  url: { type: String, require: true },
  singer: { type: String, require: false },
  lrc: { type: String, require: false },
  createtime: { type: String, require: true },
  updatetime: { type: String, require: false },
  delname: { type: String, require: true },
  albumart: { type: String, require: false }
})

const BackgroundSchema = new mongoose.Schema({
  url: { type: String, require: true }
})

const ArticleModel = mongoose.model('Article', ArticleSchema)
const MusicModel = mongoose.model('Music', MusicSchema)
const BackgroundModel = mongoose.model('Background', BackgroundSchema)

exports.ArticleModel = ArticleModel
exports.MusicModel = MusicModel
exports.BackgroundModel = BackgroundModel
