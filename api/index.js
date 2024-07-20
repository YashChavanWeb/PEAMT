import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// use try and catch for mongo connection 
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => { 
    console.log(err)
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Listening on port 3000')
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


// middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        statusCode

    });
})