import express from 'express';
import multer from 'multer';
import { validate } from "../middlewares/validate.js";
import { createAuthMiddleware } from '../middlewares/auth.middleware.js';
import { createProduct, deleteProduct, getProductById, getProducts, getProductsBySeller, updateProduct } from '../controllers/product.controller.js';
import { createProductSchema, queryProductSchema, updateProductSchema } from '../validations/product.validatior.js';
const Router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });


Router.post('/', createAuthMiddleware(['admin', 'seller']), upload.array('images', 5), validate(createProductSchema), createProduct);

Router.patch('/update/:id', createAuthMiddleware(['seller']), validate(updateProductSchema), updateProduct);

Router.delete('/delete/:id', createAuthMiddleware(['seller']), deleteProduct);

Router.get('/seller/', getProductsBySeller);

Router.get('/:id', getProductById);

Router.get('/', getProducts);


export default Router;