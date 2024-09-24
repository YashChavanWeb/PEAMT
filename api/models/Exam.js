import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    adminEmail: {
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
    timestamps: true,
});

// Middleware to hash secureCode before saving
examSchema.pre('save', async function(next) {
    if (this.isModified('secureCode')) {
        const salt = await bcrypt.genSalt(10);
        this.secureCode = await bcrypt.hash(this.secureCode, salt);
    }
    next();
});

const adminUri = process.env.ADMIN;
const adminConnection = mongoose.createConnection(adminUri);
const Exam = adminConnection.model('Exam', examSchema);

export default Exam;
