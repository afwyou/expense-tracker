const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  //在index.js已經定義前綴路由為/filter，這裡的'/'代表著/filter
  const filter = req.query.filter
  const categoryList = []
  let totalamount = 0
  // console.log(filter)  OK
  if (filter === '篩選支出') {
    res.redirect('/')
  } else {
    Category.find()
      .lean()
      .then((items) => {
        items.forEach((item) => { categoryList.push(item.category) })
      })

    Record.find({ category: filter })
      .lean()
      .then((record) => {
        // console.log(records)  OK
        record.forEach((record) => {
          totalamount += record.amount
          // console.log(totalAmount) OK
        })
        res.render('index', { record, categoryList, totalamount, filter })
      })
  }
})

module.exports = router