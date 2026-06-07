import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import _config from '../config/config.js';
import agent from '../ai-agent/agent.js';

const initialiseSocketServer = async (httpServer) => {
    try {
        const io = new Server(httpServer, {});

        // Middlewares for (only authencticated user can connected);
        io.use((socket, next) => {

            const cookies = socket.handshake.headers?.cookie;
            const { token } = cookies ? cookie.parse(cookies) : {};

            if (!token) {
                return next(new Error(`UnAuthorized : token not provided`));
            };

            // step- 2 --> verify token
            try {
                const decode = jwt.verify(token, _config.JWT_SECRET);
                socket.user = decode;
                socket.token = token;
                next();

            } catch (e) {
                console.log(e)
                return next(new Error(`UnAuthorized : Invalid token`));
            };

        });

        io.on('connection', (socket) => {
            console.log('User Info : ', socket.user);
            console.log(`Token : ${socket.token}`);
            console.log('User connected');

            socket.on('message', async (data) => {
                console.log('Received Message : ', data);

                try {
                    // Process the message and generate a response
                    const agentResponse = await agent.invoke({
                        messages: [
                            {
                                role: "user",
                                content: data
                            }
                        ]
                    }, {
                        metadata: {
                            token: socket.token
                        }
                    })

                    console.log('Agent Response : ', agentResponse);
                    const lastMessage = agentResponse.messages[agentResponse.messages.length - 1];
  
                    socket.emit('message', lastMessage.content);
                    // Send the response back to the client
                    socket.emit('response', agentResponse);
                } catch (error) {
                    console.error('Agent invocation failed:', error?.message || error);
                    socket.emit('response', {
                        success: false,
                        message: 'Agent failed to process the request',
                        error: error?.message || error
                    });
                }

                

            });
        });

    } catch (error) {
        console.log(`ERROR : ${error}`);
        new Error(`failed to initialise socket server`);
    };
};


export default initialiseSocketServer;