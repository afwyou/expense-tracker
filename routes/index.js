const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('../routes/modules/filter')
const users = require('../routes/modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')


router.use('/users', users)
router.use('/auth', auth)
router.use('/records', authenticator, records)
router.use('/filter', authenticator, filter)
router.use('/', authenticator, home)

module.exports = router