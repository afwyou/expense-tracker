const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        //如果user不存在
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        //如果user存在,比對資料庫裡的密碼以及登入端輸入的密碼彼此的雜湊值）
        return bcrypt.compare(password, user.password).then(isMatch => {
          //如果比對失敗
          if (!isMatch) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          //如果比對成功
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}