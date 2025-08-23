const UserAuthorization = require('../middleware/user-autho-middleware')
const adminAuthorization = require('../middleware/admin-autho-middleware')
const express = require('express')
const router = express.Router()


router.get('/admin',UserAuthorization,adminAuthorization,(req,res) => {
     res.status(200).json({
        success: true,
        message:'Admin visit page'
    })
})

module.exports = router