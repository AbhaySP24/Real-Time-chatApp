const mongoose=require('mongoose');
const errorHandler=require('../utility/customError.utility')
require('dotenv').config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase connected successfully");

    }catch(err){
        console.log("failed in DataBase connection",err.message);
        throw new errorHandler( "Failed to connect to DataBase",500);

    }
}

module.exports=connectDB;