const express = require('express')
const router = express.Router()
//require model
const Record = require('../../models/record')
const Category = require('../../models/category')


//定義路由首頁面
router.get('/', (req, res) => {
  const categoryList = []
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.category))
    })

  const amount = Record.aggregate([
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" }
      }
    }
  ]).exec()
  const record = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        merchant: 1,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        categoryIcon: 1,
      }
    }
  ]).exec()

  Promise.all([amount, record, categoryList])
    .then(([amount, record, categoryList]) => {

      const totalamount = amount[0]

      res.render('index', { totalamount, record, categoryList })
      console.log(amount)
      console.log(totalamount)
      console.log('record')
    })
    .catch(error => console.error(error))
})


module.exports = router
