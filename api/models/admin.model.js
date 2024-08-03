import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define schema
const adminSchema = new mongoose.Schema({
    college: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

// Check and use correct URI from environment variables
const adminUri = process.env.ADMIN;
if (!adminUri) {
    console.error('ADMIN URI is not defined in environment variables.');
    process.exit(1);
}

// Create connection to the ADMIN database
const adminConnection = mongoose.createConnection(adminUri);
console.log('Connected to MongoDB admin-user');

// Create model using adminConnection
const Admin = adminConnection.model('Admin', adminSchema);

export default Admin;
