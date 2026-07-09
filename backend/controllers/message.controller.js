const messageModel = require('../models/message.model')
const errorHandler = require('../utility/customError.utility')
const conversationModel = require('../models/conversation.model')
const {io,getSocketId}=require('../socket/socket')

const sendMessage = async (req,res,next)=>{
    try{
        const senderId=req.user._id;
        const receiverId=req.params.receiverId;
        const {message}=req.body

        if(!senderId || !receiverId || !message){
            throw new errorHandler("All fields are required",400)
        }

        let conversation=await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation= new conversationModel({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new messageModel({
            senderId,
            receiverId,
            message:message
        })

        
        conversation.messages.push(newMessage._id);
        await Promise.all([newMessage.save(),conversation.save()])

        const socketId=getSocketId(receiverId.toString())

        io.to(socketId).emit('newMessage',newMessage);

        res.status(201).json({
            success:true,
            message:"Message sent successfully",
            responseData:{
                newMessage,
                conversation
            }
        })
    }catch(err){
        next(err)
    }
}

const getMessages = async (req,res,next)=>{
    try{
        const userId=req.user._id;
        const otherUserId=req.params.otherUserId;

        if(!userId || !otherUserId){
            throw new errorHandler("User IDs are required",400)
        }

        const conversation=await conversationModel.findOne({
            participants:{$all:[userId,otherUserId]}
        }).populate('messages')

        if(!conversation){
            return res.status(200).json({
                success:false,
                responseData:{
                    messages:[]
                }
            })
        }
            return res.status(200).json({
                success:true,
                responseData:{
                    messages:conversation.messages
                }
            })
        }catch(err){
         next(err)
    }
}

module.exports={sendMessage,getMessages};