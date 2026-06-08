import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import productRoute from './routes/product.route.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


// health Route -->
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Product Service is up and  running'
    });
});


//  URL - ENDPOINTS ---------->
app.use('/api/products', productRoute);


export default app;