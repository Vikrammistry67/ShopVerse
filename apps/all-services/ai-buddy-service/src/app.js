import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'AI-Buddy Service is up and  running'
    });
});



export default app;