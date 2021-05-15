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

module.exports = router