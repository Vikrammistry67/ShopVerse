import productModel from "../models/product.model.js";
import jwt from 'jsonwebtoken';
import _config from "../config/config.js";



export const createProducts = async (req, res, next) => {
    try {
        const { } = req.body;
        
    } catch (error) {
        new Error(`failed to create products : ${error}`);
    };
 };