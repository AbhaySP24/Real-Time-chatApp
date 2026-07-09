const cloudinary=require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadToCloudinary=async (file)=>{
    try{
        const base64String=`data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result=await cloudinary.uploader.upload(base64String)
        return result.secure_url;

    }catch(err){
        throw new Error("Failed to upload image to cloudinary");
    }
}

module.exports=uploadToCloudinary;