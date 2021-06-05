const bcrypt = require('bcryptjs')
//seeder是獨立的js檔案，mongoose連線設定的變數已經移到環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const recordModels = require('../record')
const db = require('../../config/mongoose')
const recordList = require('./recordSeed.json').results
const Record = require('../record')
const User = require('../user')
const SEED_USER =
{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}


db.once('open', () => {
  console.log('mongodb connected!')

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id

      return Promise.all(Array.from({ length: 4 }, (_, i) =>
        Record.create({ ...recordList[i], userId }
        )))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})