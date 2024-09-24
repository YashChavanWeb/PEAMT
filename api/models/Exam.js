import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
        required: true,
    },
    examDate: {
        type: Date,
        required: true,
    },
    registrationEndDate: {
        type: Date,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    passingMarks: {
        type: Number,
        required: true,
    },
    adminEmail: { // New field to store the admin's email
        type: String,
        required: true,
    },

    secureCode: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

const adminUri = process.env.ADMIN;
// Create connection to the ADMIN database
const adminConnection = mongoose.createConnection(adminUri);
// Create model using adminConnection
const Exam = adminConnection.model('Exam', examSchema);

export default Exam;