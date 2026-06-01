import express from 'express';
import { addtoCart } from '../controllers/cart.controller.js';
const Router = express.Router();

Router.post('/add', addtoCart);

export default Router;