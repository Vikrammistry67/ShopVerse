import app from './src/app.js';
import _config from './src/config/config.js';
import connectToCartDB from './src/database/cartDb.js';

connectToCartDB();

app.listen(_config.PORT, () => console.log(`Cart service running at PORT ${_config.PORT}`));        