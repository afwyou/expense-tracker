const express = require('express')
const router = express.Router()
//require model
const Record = require('../../models/record')


//定義路由首頁面
router.get('/', (req, res) => {
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

  Promise.all([amount, record])
    .then(([amount, record]) => {
      const totalamount = amount[0]
      res.render('index', { totalamount, record })
    })
    .catch(error => console.error(error))
})


module.exports = router
