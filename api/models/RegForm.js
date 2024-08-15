// models/RegForm.js
import mongoose from 'mongoose';

const regFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    adhar: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    permanentAddress: {
        country: String,
        state: String,
        city: String,
        pincode: String
    },
    paymentId: { type: String, required: true }
});

const RegForm = mongoose.model('RegForm', regFormSchema);

export default RegForm;
