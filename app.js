const express = require('express')
const app = express()
require('./config/mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser, urlencoded({ extended: true }))
app.use(methodOverride('_method'))



app.listen(3000, () => {
  console.log('Listen to the http://localhost:3000')
})