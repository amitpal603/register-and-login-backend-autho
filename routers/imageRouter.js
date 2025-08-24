const adminAuthorization = require('../middleware/admin-autho-middleware')
const express = require('express')
const router = express.Router()
const {uploadImage,getImages,deleteImage} = require('../controllers/imageController')
const imageMiddleware = require('../middleware/imageMiddleware')
const UserAuthorization = require('../middleware/user-autho-middleware')


router.post('/upload',UserAuthorization,adminAuthorization,imageMiddleware.single('image'),uploadImage)
router.get('/get',UserAuthorization,getImages)
router.delete('/delete/:id',UserAuthorization,adminAuthorization,deleteImage)


module.exports = router