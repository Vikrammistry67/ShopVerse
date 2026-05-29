import _config from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        })
    };

    try {
        const decoded = jwt.verify(token, _config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        })
    };

};

