const User = require('../models/User.model')
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserRegister = async(req,res) => {
    const {username,email,password,role} = req.body

    try {
        const checkExitsUser = await User.findOne({$or:[{username},{email}]})

        if(checkExitsUser){
            res.status(401).json({
                success:false,
                message:'user already Exits so please new account register'
            })
        }
    } catch (error) {
        
    }
}


