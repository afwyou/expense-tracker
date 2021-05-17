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

  const amount = Record.count()


  const record = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        merchant: 1,
        date: 1,
        categoryIcon: 1,
      }
    }
  ]).exec()
  // console.log(amount) //Promise { <pending> }
  Promise.all([amount, record, categoryList])
    .then(([amount, record, categoryList]) => {

      const totalamount = amount

      res.render('index', { totalamount, record, categoryList })
      // console.log(amount) //is an array
      // console.log(totalamount) //is an object
    })
    .catch(error => console.error(error))
})


module.exports = router
