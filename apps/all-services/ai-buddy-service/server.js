import app from './src/app.js';
import _config from './src/config/config.js';
import connectToAiBuddyDatabase from './src/database/aibuddy.db.js';
import http from 'http';
import initialiseSocketServer from './src/socket/socket.server.js';
const httpServer = http.createServer(app);

initialiseSocketServer(httpServer);


connectToAiBuddyDatabase();
httpServer.listen(_config.PORT, () => console.log(`AI-Buddy service is running at PORT ${_config.PORT}`));