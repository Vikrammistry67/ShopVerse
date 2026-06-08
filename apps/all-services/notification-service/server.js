import _config from '../ai-buddy-service/src/config/config.js';
import app from './src/app.js';
import { fn } from './src/brokerService/listener.js';
import { connectToRabbitMQ } from './src/brokerService/message.broker.js';

connectToRabbitMQ().then(() => fn());
app.listen(_config.PORT, () => console.log(`Notification service running at PORT ${_config.PORT}`));