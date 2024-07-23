// controllers/form.controller.js

import Admin from '../models/admin.model.js'; // Adjust the path as per your file structure

export const submitForm = async (req, res, next) => {
    const { college, exam, email, phone, description, verification } = req.body;

    try {
        // Create a new document using the Mongoose model
        const newSubmission = new Admin({
            college,
            exam,
            email,
            phone,
            description,
            verification
        });

        // Save the document to the database
        await newSubmission.save();

        res.status(201).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
