import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userAuthenticationRouter from './routes/user.auth.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser())

mongoose.connect(process.env.db).then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running port 3000!');
    });
}).catch((error) => {
    console.log(error, 'Error while connecting to database');
});

app.use('/api/auth', userAuthenticationRouter);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});