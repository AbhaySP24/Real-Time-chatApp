const nodemailer=require('nodemailer')
require('dotenv').config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

(async()=>{
    try{
        await transporter.verify();
        console.log('ready to send Email..')
    }
    catch(error){
       console.error("Transporter verification failed:", error.message);
    }
})();

const sendEmail = async (to,subject,text='Welcome to Our App',html)=>{
    try{
        await transporter.sendMail({
            from:process.env.EMAIL,
            to,
            subject,
            text,
            html
        })
    }
    catch(err){
        throw new Error("Failed to send email");
    }
} 

module.exports=sendEmail;
