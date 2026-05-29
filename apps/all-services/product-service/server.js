import app from "./src/app.js";
import _config from "./src/config/config.js";
import connectToProductDb from "./src/database/productDb.js";

connectToProductDb();
app.listen(_config.PORT, () => console.log(`Product service running at PORT : ${_config.PORT}`))