const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/filter', (req, res) => {
  const filter = req.query.filter
  const categoryList = []
  let totalAmount = 0
  if (filter === '篩選支出') {
    res.render('/')
  } else {
    Category.find()
      .lean()
      .then((items) => {
        items.forEach((item) => { categoryList.push(item.category) })
      })

    Record.find({ category: filter })
      .lean()
      .then((records) => {
        records.forEach((record) => {
          totalAmount += record.amount
        })
        res.render('index', { records, categoryList, totalAmount, filter })
      })
  }
})

module.exports = router