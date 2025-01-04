const express = require('express')
const controller = require('../controllers/auth')

const router = express.Router()


router.post('/login',controller.login)
router.post('/register',controller.register)
router.post('/checkUser',controller.checkUser)
router.post('/changePassword',controller.changePassword)


module.exports = router