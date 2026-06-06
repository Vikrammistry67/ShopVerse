import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import aibuddyRoute from './routes/aibuddy.routes.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/aibuddy', aibuddyRoute);

export default app;