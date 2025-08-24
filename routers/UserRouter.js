const express = require('express')
const {userRegister, userLogin,changePassword} = require('../controllers/userController')
const UserAuthorization = require('../middleware/user-autho-middleware')



const router = express.Router()



router.post('/register',userRegister)
router.post('/login',userLogin)
router.post('/change',UserAuthorization,changePassword)

module.exports  = router