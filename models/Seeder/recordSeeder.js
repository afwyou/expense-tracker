const recordModels = require('../record')
const db = require('../../config/mongoose')
const categoryList = require('./categoryList.json').category

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 5; i++) {
    let randomCategory = Math.floor(Math.random() * categoryList.length)
    let date = new Date()
    recordModels.create({
      name: `name-${i}`,
      category: categoryList[randomCategory].name,
      amount: `${i}`,
      categoryIcon: categoryList[randomCategory].icon,
    })
  }

  console.log('done!')
})