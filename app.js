const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
//如果不先宣告起來，後面的環境變數通通不能用
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT
require('./config/mongoose')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
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
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)


app.listen(PORT, () => {
  console.log(`Listen to the http://localhost:${PORT}`)
})