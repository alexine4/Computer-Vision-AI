const express = require('express')
const controller = require('../controllers/cameras')
const passport = require('passport')
const router = express.Router()


router.get('/getAll',passport.authenticate('jwt', { session: false }),controller.fetchAll)
router.get('/getById/:cameraId',passport.authenticate('jwt', { session: false }),controller.fetchOne)
router.post('/addNew',passport.authenticate('jwt', { session: false }),controller.addNew)
router.patch('/change/:cameraId',passport.authenticate('jwt', { session: false }),controller.update)
router.delete('/delete/:cameraId',passport.authenticate('jwt', { session: false }),controller.delete)



module.exports = router