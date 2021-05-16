const express = require('express')
const router = express.Router()
//require model
const Record = require('../../models/record')
const Category = require('../../models/category')


//定義路由首頁面
router.get('/', (req, res) => {
  const categoryList = []
  const filter = req.query.filter
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.category))
    })

  const amount = Record.aggregate([
    {
      $group: {
        _id: null,//沒有要根據什麼來分組
        totalamount: { $sum: "$amount" }//我要操作的資料代號是amount，這個資料代號代表我要加總($sum)欄位amount的值
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
  // console.log(amount) //Promise { <pending> }
  Promise.all([amount, record, categoryList])
    .then(([amount, record, categoryList]) => {

      const totalamount = amount[0]

      res.render('index', { totalamount, record, categoryList })
      // console.log(amount) //is an array
      // console.log(totalamount) //is an object
    })
    .catch(error => console.error(error))
})


module.exports = router
