import app from './src/app.js';
import { connectToRabbitMQ } from './src/broker/broker.js';
import _config from './src/config/config.js';
import connectToPaymentDB from './src/database/paymentDB.js';


connectToPaymentDB();
connectToRabbitMQ();
app.listen(_config.PORT, () => console.log(`Payment service is running at PORT ${_config.PORT}`));