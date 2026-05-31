import express from 'express';
import multer from 'multer';
import { createAuthMiddleware } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
const Router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
Router.post('/',
    createAuthMiddleware(['admin', 'seller']),
    upload.array('images', 5),
    createProduct);

export default Router;