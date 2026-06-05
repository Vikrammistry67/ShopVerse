import jwt from 'jsonwebtoken';
import _config from '../config/config.js';

// Role based authentication --->
export const createAuthMiddleware = (roles = ['user']) => {
    return async (req, res, next) => {

        const token = req.cookies?.token ||
            (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        try {
            if (!token) {
                return res.status(409).json({
                    success: false,
                    message: 'Un-Authorized : token not provided'
                });
            };

            try {
                const decoded = jwt.verify(token, _config.JWT_SECRET);

                if (!roles.includes(decoded.role)) {
                    return res.json(409).json({
                        succes: false,
                        message: 'Forbidden : Insufficient permission'
                    });
                };

                req.user = decoded;
                next();
            } catch (error) {
                console.log(`ERROR : `, error);
                return res.status(403).json({
                    success: false,
                    message: 'Un-Authorized'
                });
            }
        } catch (error) {
            console.log(`ERROR : `, error);
            return res.status(500).json({
                success: false,
                message: 'internal Server error'
            });
        };
    };
};