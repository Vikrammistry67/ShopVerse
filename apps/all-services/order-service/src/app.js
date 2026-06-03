import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import orderRoute from './routes/order.routes.js';
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


// END POINT 
app.use('/api/orders', orderRoute);

export default app;