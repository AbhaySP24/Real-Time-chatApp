const express=require('express')
const router=express.Router();
const authController=require('../controllers/auth.controller');
const upload=require('../middlewares/multer.middleware');
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/get-profile',authMiddleware,authController.getProfile);
router.post('/update-profile',authMiddleware,upload.single('profileImage'),authController.updateProfile);
router.get('/other-users',authMiddleware,authController.getOtherUser);
router.post('/logout',authMiddleware,authController.logout);

module.exports=router;