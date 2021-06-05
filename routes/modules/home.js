const express = require('express')
const router = express.Router()
//require model
const Record = require('../../models/record')
const Category = require('../../models/category')


//定義路由首頁面
router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryList = []
  let totalamount = 0
  const filter = req.query.filter
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.category))
    })

  Record.find({ userId })
    .lean()
    // .sort({ _id: 'asc' })
    .then((records) => {
      console.log(records)
      records.forEach((record) => (totalamount += record.amount))
      res.render('index', { records, totalamount, categoryList })
    })
    .catch((error) => console.error(error))
})




module.exports = router
