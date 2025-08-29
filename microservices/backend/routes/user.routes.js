import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/AuthMiddleware.js';
import refreshTokenMiddleware from '../middlewares/RefreshTokenMiddleware.js';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/begr', authMiddleware, (req, res) => {
	res.status(200).json("hi");
});

router.post('/refresh_token', refreshTokenMiddleware, UserController.refresh_token);

router.post('/logout', authMiddleware, UserController.logout);

export default router;