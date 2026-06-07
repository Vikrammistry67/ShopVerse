import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _config from '../config/config.js';


export function createAuthMiddleware(roles = ['user']) {
    return function authMiddleware(req, res, next) {
        const token = req.cookies?.token ||
            (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'token not provided'
            });
        };

        try {
            const decoded = jwt.verify(token, _config.JWT_SECRET);
            if (!roles.includes(decoded.role)) {
                return res.status(401).json({
                    success: false,
                    message: `Forbidden : insufficient permission`
                });
            };

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized User',
                error: error.message || error
            });
        };

    };
};