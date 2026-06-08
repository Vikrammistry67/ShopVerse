import app from './src/app.js';
import { connectToRabbitMQ } from './src/broker/broker.js';
import _config from './src/config/config.js';
import connectToOrderDb from './src/database/orderDB.js';

connectToOrderDb();
connectToRabbitMQ();
app.listen(_config.PORT, () => console.log(`Order service running at PORT : ${_config.PORT}`));