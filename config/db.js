const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected mongodb..');
        
    } catch (error) {
        console.log('DataBase not connected',error);
        process.exit(1)
    }
}

module.exports = connectDB