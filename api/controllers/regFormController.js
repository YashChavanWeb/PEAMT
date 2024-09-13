import RegForm from '../models/RegForm.js';

    // Create a new registration form
    export const createRegForm = async (req, res) => {
        try {
            const {
                name, adhar, email, phone, fatherName, motherName, currentCourse,
                subjects, dateOfBirth, gender, nationality, emergencyContact,
                previousEducation, permanentAddress, paymentId, examNames
            } = req.body;

            console.log('Received data:', req.body); // Log incoming request data

            if (!name || !adhar || !email || !phone || !fatherName || !motherName ||
                !currentCourse || !subjects || !dateOfBirth || !gender || !nationality ||
                !emergencyContact || !previousEducation || !permanentAddress || !paymentId) {
                console.error('Missing required fields'); // Log if fields are missing
                return res.status(400).json({ message: 'All fields are required' });
            }

            const subjectsArray = Array.isArray(subjects) ? subjects : [];
            const examNamesString = Array.isArray(examNames) ? examNames.join(',') : '';

            const newRegForm = new RegForm({
                name, adhar, email, phone, fatherName, motherName, currentCourse,
                subjects: subjectsArray, dateOfBirth, gender, nationality,
                emergencyContact, previousEducation, permanentAddress, paymentId,
                examNames: examNamesString
            });

            await newRegForm.save();
            res.status(201).json(newRegForm);
        } catch (error) {
            console.error('Error creating registration form:', error); // Log the error
            res.status(500).json({ message: 'Error creating form. Please try again.' });
        }
    };

    // Get a registration form by its ID
    export const getRegFormById = async (req, res) => {
        try {
            const { id } = req.params;
            const regForm = await RegForm.findById(id);
            if (!regForm) {
                return res.status(404).json({ message: 'Form not found' });
            }
            res.status(200).json(regForm);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Update an existing registration form
    export const updateRegForm = async (req, res) => {
        try {
            const { id } = req.params;
            const { examName } = req.body;
    
            // Find the form by ID
            const form = await RegForm.findById(id);
    
            if (!form) {
                return res.status(404).json({ message: 'Form not found' });
            }
    
            // Check if the examName is already present
            let examNames = form.examNames ? form.examNames.split(',') : [];
            if (!examNames.includes(examName)) {
                examNames.push(examName); // Add new exam name to the array
            }
    
            // Update examNames as a comma-separated string
            form.examNames = examNames.join(',');
    
            // Save updated form
            await form.save();
    
            res.status(200).json({ message: 'Form updated successfully', form });
        } catch (error) {
            res.status(500).json({ message: 'Error updating form', error });
        }
    };

// Get a registration form by Aadhar number
export const getRegFormByAdhar = async (req, res) => {
    try {
        const { adhar } = req.params;
        const regForm = await RegForm.findOne({ adhar });
        if (!regForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(regForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
