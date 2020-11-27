/**
 * @file 包含 N 个操作数据库集合数据的 Model 模块
 * @lastModifiedTime 2019-10-29 11:13:19
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const mongoose = require('mongoose')
const { mongoKey } = require('../config/mongoConfig')

const { MusicSchema } = require('./MusicSchema')
const { UserSchema } = require('./UserSchema')
const { BackgroundSchema } = require('./BackgroundSchema')
const { ArticleSchema } = require('./ArticleSchema')

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

exports.ArticleModel = mongoose.model('Article', ArticleSchema)
exports.MusicModel = mongoose.model('Music', MusicSchema)
exports.BackgroundModel = mongoose.model('Background', BackgroundSchema)
exports.UserModel = mongoose.model('User', UserSchema)
