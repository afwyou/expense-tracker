const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

//creat new
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((category) =>
      // console.log(category),//is an array//add this , page go wrong
      res.render('new', { category })
    )
    .catch((error) => console.log(error))
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// 修改
// 每一個按鈕上有綁定個別id的路由連結
//此路由器的設定在id這個欄位已設定為變數
//如此可以透過req.params取得之後，去mongodb找到對應的資料
router.get('/:id/edit', (req, res) => {
  //取得名為id的路由變數
  const id = req.params.id
  const categoryList = []
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.category))
    })

  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
})

module.exports = router