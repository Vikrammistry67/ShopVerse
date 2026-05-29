import express from 'express';
const app = express()
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoute from '../src/routes/auth.route.js';

//middlewares ---->
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// url emdpoints --->
app.use('/', authRoute);

export default app;
