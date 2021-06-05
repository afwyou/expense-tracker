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
  const userId = req.user._id
  const record = req.body
  const category = record.category
  Category.findOne({ category: category })//資料庫的屬性名稱是category，不是name
    .lean()
    .then((item) => {
      return (record.categoryIcon = item.categoryIcon, record.userId = userId)
    })
    //原本userId似乎沒有存入mongodb，Record.create，還有record.save()的差別？
    .then(() => {
      console.log(record)
      Record.create(record)
      res.redirect('/')
    })
    .catch((error) => console.log(error))
})


// 修改
// 每一個按鈕上有綁定個別id的路由連結
//此路由器的設定在id這個欄位已設定為變數
//如此可以透過req.params取得之後，去mongodb找到對應的資料
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  //取得名為id的路由變數
  const _id = req.params.id
  const categoryList = []
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.category))
    })
  //改成 Todo.findOne({ _id, userId })，才能串接多個條件。
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
})
//修改類別？？
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount, merchant } = req.body
  console.log('第一個列印', category)//1
  Record.findOne({ _id, useId })
    // .lean()//原來不可以有lean()???
    .then(r => {
      r = Object.assign(r, req.body)
      Category.findOne({ category: category })
        .lean()
        .then((item) => {
          console.log('第二個列印', item)//2
          return (r.categoryIcon = item.categoryIcon)
        })
        //想辦法讓新的icon存進去之後，再做存擋

        .then(() => {
          console.log('第三個列印', r.categoryIcon)//3
          r.save()
        })

    })

    .then(() => {
      res.redirect('/')
    })
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router