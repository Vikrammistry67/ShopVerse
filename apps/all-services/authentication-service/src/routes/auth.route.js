import express from 'express';
import { forgotPassword, getUserDetails, loginUser, logOutUser, registerUser, resetPassword } from '../controllers/auth.controller.js';
import { loginUserValidation, registerUserValidations } from '../validations/auth.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const Router = express.Router();

Router.post('/register', registerUserValidations, registerUser);
Router.post('/login', loginUserValidation, loginUser);
Router.get('/profile', authMiddleware, getUserDetails);
Router.post('/logout', authMiddleware, logOutUser);
Router.post('/forgot-password', authMiddleware, forgotPassword);
Router.post('/reset-password', authMiddleware, resetPassword);

export default Router;