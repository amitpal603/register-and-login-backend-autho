const mongoose = require('mongoose')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = User