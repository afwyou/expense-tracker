const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
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

app.engine('handlebars', helper.engine)
app.set('view engine', 'handlebars')
app.use((bodyParser.urlencoded({ extended: true })))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`Listen to the http://localhost:${PORT}`)
})