import mongoose from 'mongoose';

const regFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    adhar: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    currentCourse: { type: String, required: true },
    subjects: [{ type: String }], // Array of strings
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    emergencyContact: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    previousEducation: { type: String, required: true },
    permanentAddress: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    paymentId: { type: String, required: true },
    examNames: [String] // Changed from array to comma-separated string
});

const RegForm = mongoose.model('RegForm', regFormSchema);

export default RegForm;

