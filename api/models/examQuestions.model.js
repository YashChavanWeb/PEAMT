import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['MCQ', 'Theory'],
        default: 'MCQ',
    },
    options: {
        type: [String],
        validate: [arrayLimit, 'Options array must have exactly 4 options'],
        default: ['', '', '', ''],
    },
    correctAnswer: {
        type: Number, // Index of the correct option for MCQ
        default: null,
    },
    marks: {
        type: Number,
        default: 0,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium',
    },
    subject: {
        type: String,
        required: true, // Assuming subject is required
    },
});

function arrayLimit(val) {
    return val.length === 4;
}

const examQuestionsSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true,
    },
    questions: [questionSchema], // Array of questions
    adminEmail: {
        type: String,
        required: true,
    },
});

const adminUri = process.env.ADMIN;
// Create connection to the ADMIN database
const adminConnection = mongoose.createConnection(adminUri);
// Create model using adminConnection
const ExamQuestions = adminConnection.model('ExamQuestions', examQuestionsSchema);

export default ExamQuestions;
