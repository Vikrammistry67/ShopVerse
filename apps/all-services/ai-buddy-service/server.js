import app from './src/app.js';
import _config from './src/config/config.js';
import connectToAiBuddyDatabase from './src/database/aibuddy.db.js';

connectToAiBuddyDatabase();
app.listen(_config.PORT, () => console.log(`AI-Buddy service is running at PORT ${_config.PORT}`));