const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  //在index.js已經定義前綴路由為/filter，這裡的'/'代表著/filter
  const { filter, filterMonth } = req.query
  const categoryList = []
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dem']
  let totalamount = 0
  //取得月份的序列數值
  let monthNumber = month.indexOf(filterMonth) || ''
  //轉換月份數值，如果沒有選擇，則變成1到12月
  function getMonthStart(monthNumber) {
    return monthNumber === -1 ? 0 : monthNumber
  }
  function getMonthEnd(monthNumber) {
    return monthNumber === -1 ? 11 : monthNumber
  }
  //設定撈資料的起始時間
  let startTime = new Date(2021, getMonthStart(monthNumber), 2, 0, 0, 0)
  let endTime = new Date(2021, getMonthEnd(monthNumber), 29, 0, 0, 0)




  if (filter === '' && filterMonth === '') {
    res.redirect('/')
  } else {
    Category.find()
      .lean()
      .then((items) => {
        items.forEach((item) => { categoryList.push(item.category) })
      })

    Record.find({
      //條件不能設三個？
      //先找出符合日期範圍的物件
      // category: filter,
      date: {
        $gte: startTime,
        $lte: endTime
      },
      userId
    })
      .lean()
      .then((records) => {
        //再篩選出物件屬性category等於filter的物件
        if (filter) {
          records = records.filter(eachRecord => {
            if (eachRecord.category === filter) {
              return eachRecord
            }
          })
        }
        //選出來的物件，加總amount屬性的值
        records.forEach((record) => {
          totalamount += record.amount
        })
        return records
        //把要渲染的物件、陣列，丟給view

      })
      .then((records) => res.render('index', { records, categoryList, totalamount, filter, filterMonth, month }))
      .catch(error => console.log(error))
  }
})

module.exports = router