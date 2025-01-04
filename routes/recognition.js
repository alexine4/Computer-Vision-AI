const express = require('express')
const controller = require('../controllers/recognitionResult')

const router = express.Router()


router.post('/addNew',controller.addNew)
router.get('/getAll',controller.getAll)



module.exports = router