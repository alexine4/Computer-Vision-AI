const express = require('express')
const controller = require('../controllers/recognitionResult')
const passport = require('passport')

const router = express.Router()


router.post('/addNew',passport.authenticate('jwt', { session: false }),controller.addNew)
router.get('/getAll',passport.authenticate('jwt', { session: false }),controller.getAllWithParameters)



module.exports = router