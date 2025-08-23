const express = require('express')
require('dotenv').config()
const connectDB  = require('./config/db')
const UserRouter = require('./routers/UserRouter')
const userAuthoRouter = require('./routers/userAuthoRouter')
const adminAuthoRouter = require('./routers/adminAuthoRouter')

connectDB()
const app = express()
app.use(express.json())
app.use('/user',UserRouter)
app.use('/autho',userAuthoRouter)
app.use('/autho',adminAuthoRouter)

app.get('/',(req,res) => {
    res.status(200).json({
        success: false,
        message:'Server will be running'
    })
})

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`server on running port number : ${PORT}`);

})