const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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
  //臉書登入
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    //從臉書取得的資料profile._json
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        //如果有使用者
        if (user) return done(null, user)
        //如果沒有使用者
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
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