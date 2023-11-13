import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import userAuthenticationRouter from './routes/user.auth.js'

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.db).then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running port 3000!');
    });
}).catch((error) => {
    console.log(error, 'Error while connecting to database');
});

app.use('/api/user', userRouter);
app.use('/api/auth', userAuthenticationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});