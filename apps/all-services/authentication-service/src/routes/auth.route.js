import express from 'express';
import { addUserAddress, forgotPassword, getUserAddress, getUserAddressById, getUserDetails, loginUser, logOutUser, registerUser, resetPassword } from '../controllers/auth.controller.js';
import { addressValidation, loginUserValidation, registerUserValidations } from '../validations/auth.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const Router = express.Router();

Router.post('/register', registerUserValidations, registerUser);
Router.post('/login', loginUserValidation, loginUser);
Router.get('/profile', authMiddleware, getUserDetails);
Router.post('/logout', authMiddleware, logOutUser);
Router.post('/forgot-password', authMiddleware, forgotPassword);
Router.post('/reset-password', authMiddleware, resetPassword);

Router.get('/users/me/addresses', authMiddleware, getUserAddress);
Router.post('/users/me/addressess', authMiddleware, addressValidation, addUserAddress);
Router.get('/users/me/addresses/:addressId', authMiddleware, getUserAddressById);

export default Router;