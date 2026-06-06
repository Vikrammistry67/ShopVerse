import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import _config from '../config/config.js';

const initialiseSocketServer = async (httpServer) => {
    try {
        const io = new Server(httpServer, {});

        // Middlewares for (only authencticated user can connected);
        io.use((socket, next) => {

            const cookies = socket.handshake?.headers?.cookie;

            const { token } = cookies ? cookie.parse(cookies) : {};

            if (!token) {
                return next(new Error(`UnAuthorized : token not provided`));
            };

            // step- 2 --> verify token
            try {
                const decode = jwt.verify(token, _config.JWT_SECRET);
                socket.user = decode;
                console.log('DECODED : ', decode);
                next();

            } catch (e) {
                console.log(e)
                return next(new Error(`UnAuthorized : Invalid token`));
            };

        });
        io.on('connection', (socket) => {
            console.log('User connected')
        });

    } catch (error) {
        console.log(`ERROR : ${error}`);
        new Error(`failed to initialise socket server`);
    };
};


export default initialiseSocketServer;