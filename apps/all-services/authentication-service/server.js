import app from './src/app.js';
import _config from './src/config/config.js';
import connectToDB from './src/database/db.js';
connectToDB();

app.listen(_config.PORT, () => console.log(`Authentication service is running at PORT : ${_config.PORT}`));