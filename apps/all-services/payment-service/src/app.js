import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import paymentRoute from './routes/payment.routes.js';
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


app.use('/api/payments', paymentRoute);


export default app;