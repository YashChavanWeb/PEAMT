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
    dateOfBirth: { type: Date, required: true }, // New field
    gender: { type: String, required: true }, // New field
    nationality: { type: String, required: true }, // New field
    emergencyContact: {
        name: { type: String, required: true }, // Emergency contact's name
        phone: { type: String, required: true } // Emergency contact's phone number
    },
    previousEducation: { type: String, required: true }, // New field
    permanentAddress: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    paymentId: { type: String, required: true }
});

const RegForm = mongoose.model('RegForm', regFormSchema);

export default RegForm;
