import app from "./src/app.js";
import { connectToRabbitMQ } from "./src/broker/broker.js";
import _config from "./src/config/config.js";
import connectToProductDb from "./src/database/productDb.js";

connectToProductDb();
connectToRabbitMQ();
app.listen(_config.PORT, () => console.log(`Product service running at PORT : ${_config.PORT}`))