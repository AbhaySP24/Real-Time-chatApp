const errorHandler=require('../utility/customError.utility')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const userModel=require('../models/User.model')
const uploadToCloudinary=require('../config/cloudinary.config')
require('dotenv').config();
const welcomeTemplate=require('../utility/welcomEmail.utility');
const sendEmail=require('../utility/sendMail.utility');

const register=async (req,res,next)=>{
    const {username,email,password}=req.body;
    try{

        if(!username || !email || !password){
            throw new errorHandler("All fields are required",400)
        }

        const existingUser=await userModel.findOne({$or:[{username},{email}]});

        if(existingUser){
            throw new errorHandler("User already exists",400)
        }

        const hashedPassword=await bcrypt.hash(password,10);
        

        const newUser=await userModel.create({
            username,
            email,
            password:hashedPassword
        })

        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)

        res.cookie('token',token,{
            expires:new Date(Date.now()+24*60*60*1000),
            withCredentials:true,
            httpOnly:true
        })

        const htmlContent = welcomeTemplate(username);
        await sendEmail(email,"Welcome to ChatApp",undefined,htmlContent);

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            responseData:{
                newUser,
                token
            }
        })

    }catch(err){
        next(err)
    }
}

const login = async (req,res,next)=>{
    const {email,password}=req.body;
    try{

        if(!email || !password){
            throw new errorHandler("All fields are required",400)
        }

        const user=await userModel.findOne({email});

        if(!user){
            throw new errorHandler("User not found",404)
        }

        const isPasswordMatched=await bcrypt.compare(password,user.password);

        if(!isPasswordMatched){
            throw new errorHandler("Invalid credentials",401)
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.cookie('token',token,{
            expires:new Date(Date.now()+24*60*60*1000),
            withCredentials:true,
            httpOnly:true
        })

        return res.status(200).json({
            success:true,
            message:"User logged in successfully",  
            responseData:{
                user,
                token
            }    
        })

    }catch(err){
        next(err);
    }
}

const getProfile=async (req,res,next)=>{
    try{
        const user=req.user;
        res.status(200).json({
            success:true,
            message:"User profile fetched successfully",
            responseData:{
                user
            }
        })  

    }catch(err){
        next(err)
    }
}

const logout=async (req,res,next)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })

    }catch(err){
        next(err);
    }
}

const updateProfile=async (req,res,next)=>{
    try{
        const image=req.file;
        const user=req.user;

        const imageUrl=await uploadToCloudinary(image);

        user.profilePic=imageUrl;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Profile picture updated successfully",
            responseData:{
                user
            }
        })


    }catch(err){
        next(err);
    }
}

const getOtherUser=async (req,res,next)=>{
    try{
        const allUser=await userModel.find({_id:{$ne:req.user._id}}).select('-password');
        return res.status(200).json({
            success:true,
            message:"All users fetched successfully",
            responseData:{
                allUser
            }
        })

    }catch(err){
        next(err);
    }
}

module.exports={register,login,getProfile,logout,updateProfile,getOtherUser};