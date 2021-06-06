const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: String,
  category: String,
  date: { type: Date, default: Date.now },
  amount: Number,
  categoryIcon: { type: String, },
  merchant: { type: String, },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})


module.exports = mongoose.model('Record', recordSchema)