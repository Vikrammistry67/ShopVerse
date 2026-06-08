import app from './src/app.js';
import { connectToRabbitMQ } from './src/broker/broker.js';
import { listenerFn } from './src/broker/listener.js';
import _config from './src/config/config.js';
import connectToSellerDashboardDB from './src/database/db.js';

connectToRabbitMQ().then(() => listenerFn());
connectToSellerDashboardDB();
app.listen(_config.PORT, () => console.log(`Seller Dashboard service is running at  PORT ${_config.PORT}`));