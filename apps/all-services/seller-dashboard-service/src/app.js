import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import sellerRoute from './routes/sellerdashboard.routes.js';
const app = express();

// required middlewares --->
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// health Route -->
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Seller dashboard is up and  running'
    });
});


// URL - endoints -->
app.use('/seller/dashboard', sellerRoute);
export default app;