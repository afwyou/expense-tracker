const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('../routes/modules/filter')
const users = require('../routes/modules/users')


router.use('/users', users)
router.use('/records', records)
router.use('/filter', filter)
router.use('/', home)

module.exports = router