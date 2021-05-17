const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: String,
  category: String,
  date: { type: String, default: Date.now },
  amount: Number,
  categoryIcon: { type: String, },
  merchant: { type: String, },
})


module.exports = mongoose.model('Record', recordSchema)