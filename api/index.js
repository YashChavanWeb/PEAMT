import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config();

// use try and catch for mongo connection 
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err)
});

const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000')
})


// create a simple get api
app.use('/api/user', userRoutes);