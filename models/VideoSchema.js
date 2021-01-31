const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  url: { type: String, require: true },
  createtime: { type: String, require: true },
  updatetime: { type: String, require: false },
  albumart: { type: String, require: false }
})

module.exports = {
  VideoSchema
}

