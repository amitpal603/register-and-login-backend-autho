const User = require('../models/User.model')
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const userRegister = async(req,res) => {
    const {username,email,password,role} = req.body

    try {
        const checkExitsUser = await User.findOne({$or:[{username},{email}]})

        if(checkExitsUser){
            res.status(401).json({
                success:false,
                message:'user already Exits so please new account register'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashPassword,
            role:role || 'user'
        })

        await newUser.save()

       if(newUser){
         res.status(201).json({
            success: true,
            message:'User SuccessFully Register..👍'
        })
       }
       else{
         res.status(400).json({
            success: false,
            message:'please Try again..👍'
        })
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
        
    }
}

const userLogin = async(req,res) => {
    const {email,password} = req.body
    try {
        const CheckUser = await User.findOne({email})

        if(!CheckUser){
            res.status(400).json({
                success:false,
                message:"No registered User so please Register"
            })
        }

        const isPassword = await bcrypt.compare(password,CheckUser.password)

        if(!isPassword){
            res.status(400).json({
                success:false,
                message:'Invalid Email or Password'
            })
        }

        const accessToken = jwt.sign({
            userId : CheckUser._id,
            username: CheckUser.username,
            role: CheckUser.role
        },process.env.JWT_PRIVATE_KEY,{
            expiresIn: '9m'
        })

        res.status(200).json({
            success:true,
            message:'Login successFully..🙋‍♂️',
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
module.exports = {userRegister,userLogin}


