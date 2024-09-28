    // models/Result.js
    import mongoose from 'mongoose';

    const resultSchema = new mongoose.Schema({
        examName: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        score: { type: Number, required: true },
        responses: { type: Object, required: true },
        createdAt: { type: Date, default: Date.now },
    });

    const Result = mongoose.model('Result', resultSchema);
    export default Result;
