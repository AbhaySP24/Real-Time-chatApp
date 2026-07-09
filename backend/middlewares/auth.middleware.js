const jwt=require('jsonwebtoken')
const errorHandler=require('../utility/customError.utility')
const userModel=require('../models/User.model')

const authMiddleware = async (req,res,next)=>{
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return next(new errorHandler("Unauthorized access",401))
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
       const user=await userModel.findById(decoded.id).select('-password');

       if(!user){
         return next(new errorHandler("User not found",404))
       }
       req.user=user;

        next();
    }catch(err){
        return next(new errorHandler("Invalid token",401))
    }
}

module.exports=authMiddleware