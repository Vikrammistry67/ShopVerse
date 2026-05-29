import express from 'express';
import { createProducts } from '../controllers/product.controller.js';
const Router = express.Router();

Router.post('/createproducts', createProducts);

export default Router;