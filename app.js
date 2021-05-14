const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
require('./config/mongoose')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const helper = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    eq: function (v1, v2) {
      return v1 === v2
    }
  }
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use((bodyParser.urlencoded({ extended: true })))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(3000, () => {
  console.log('Listen to the http://localhost:3000')
})