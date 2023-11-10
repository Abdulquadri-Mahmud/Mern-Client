import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(process.env.db).then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running port 3000!');
    });
}).catch((error) => {
    console.log(error, 'Error whiule connecting to database');
});