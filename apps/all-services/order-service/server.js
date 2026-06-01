import app from './src/app.js';
import _config from './src/config/config.js';
import connectToCartDb from './src/database/db.js';

connectToCartDb();

app.listen(_config.PORT, () => console.log(`Cart service running at PORT : ${_config.PORT}`));