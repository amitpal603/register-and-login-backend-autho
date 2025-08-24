const express = require('express')
require('dotenv').config()
const connectDB  = require('./config/db')
const UserRouter = require('./routers/UserRouter')
const userAuthoRouter = require('./routers/userAuthoRouter')
const adminAuthoRouter = require('./routers/adminAuthoRouter')
const imageRouter = require('./routers/imageRouter')

connectDB()
const app = express()
app.use(express.json())
app.use('/user',UserRouter)  // user login register routes
app.use('/autho',userAuthoRouter)  // user Authorization routes
app.use('/autho',adminAuthoRouter) // admin authorization routes
app.use('/image',imageRouter) // image upload and get routes

app.get('/',(req,res) => {
    res.status(200).json({
        success: true,
        message:'Server will be running'
    })
})

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`server on running port number : ${PORT}`);

})