const adminAuthorization = require('../middleware/admin-autho-middleware')
const express = require('express')
const router = express.Router()
const uploadImage = require('../controllers/imageController')
const imageMiddleware = require('../middleware/imageMiddleware')
const UserAuthorization = require('../middleware/user-autho-middleware')


router.post('/upload',UserAuthorization,adminAuthorization,imageMiddleware.single('image'),uploadImage)


module.exports = router