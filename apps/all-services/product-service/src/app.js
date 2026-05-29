import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import productRoute from './routes/product.route.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


//  URL - ENDPOINTS ---------->
app.use('/', productRoute);


export default app;