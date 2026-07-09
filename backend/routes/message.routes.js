const express=require('express');
const router=express.Router();
const messageController=require('../controllers/message.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/send-message/:receiverId',authMiddleware,messageController.sendMessage);
router.get('/get-messages/:otherUserId',authMiddleware,messageController.getMessages);

module.exports=router;