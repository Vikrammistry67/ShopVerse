import app from './src/app.js';
import { connectToRabbitMQ } from './src/brokerService/broker.service.js';
import _config from './src/config/config.js';
import connectToDB from './src/database/db.js';
connectToDB();
connectToRabbitMQ();

app.listen(_config.PORT, () => console.log(`Authentication service is running at PORT : ${_config.PORT}`));