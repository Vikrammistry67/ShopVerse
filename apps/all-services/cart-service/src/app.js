import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cartRoute from './routes/cart.route.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))


app.use('/api/carts', cartRoute);


export default app;