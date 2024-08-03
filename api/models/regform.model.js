import mongoose from 'mongoose';

const regFormSchema = new mongoose.Schema({
    aadharNumber: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    religion: { type: String },
    casteCategory: { type: String },
}, { timestamps: true });

const RegForm = mongoose.model('RegForm', regFormSchema);
export default RegForm;
