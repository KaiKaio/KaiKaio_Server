const mongoose = require('mongoose')

const BackgroundSchema = new mongoose.Schema({
  url: { type: String, require: true }
})

module.exports = {
  BackgroundSchema
}
