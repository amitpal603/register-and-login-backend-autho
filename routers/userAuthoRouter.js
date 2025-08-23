const UserAuthorization = require('../middleware/user-autho-middleware')
const  express = require('express')

const router = express.Router()

router.get('/user',UserAuthorization,(req,res) => {
    res.status(200).json({
        success: true,
        message:'User visit page'
    })
})

module.exports = router