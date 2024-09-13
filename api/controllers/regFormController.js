import RegForm from '../models/RegForm.js';

// Create or update a registration form
export const createRegForm = async (req, res) => {
    try {
        const {
            name, adhar, email, phone, fatherName, motherName, currentCourse,
            subjects, dateOfBirth, gender, nationality, emergencyContact,
            previousEducation, permanentAddress, paymentId, examNames
        } = req.body;

        // Validate required fields
        if (!name || !adhar || !email || !phone || !fatherName || !motherName ||
            !currentCourse || !subjects || !dateOfBirth || !gender || !nationality ||
            !emergencyContact || !previousEducation || !permanentAddress || !paymentId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Ensure subjects and examNames are arrays
        const subjectsArray = Array.isArray(subjects) ? subjects : [];
        const examNamesArray = Array.isArray(examNames) ? examNames : [];

        // Find if there's an existing form with the same Aadhar
        const existingForm = await RegForm.findOne({ adhar });

        if (existingForm) {
            // Prepare new examNames list by merging with existing ones
            const updatedExamNames = Array.from(new Set([...existingForm.examNames, ...examNamesArray]));

            // Check if all details are identical except examNames
            const isExactMatch = existingForm.name === name &&
                existingForm.email === email &&
                existingForm.phone === phone &&
                existingForm.fatherName === fatherName &&
                existingForm.motherName === motherName &&
                existingForm.currentCourse === currentCourse &&
                JSON.stringify(existingForm.subjects) === JSON.stringify(subjectsArray) &&
                existingForm.dateOfBirth.toISOString() === new Date(dateOfBirth).toISOString() &&
                existingForm.gender === gender &&
                existingForm.nationality === nationality &&
                JSON.stringify(existingForm.emergencyContact) === JSON.stringify(emergencyContact) &&
                existingForm.previousEducation === previousEducation &&
                JSON.stringify(existingForm.permanentAddress) === JSON.stringify(permanentAddress) &&
                existingForm.paymentId === paymentId;

            if (isExactMatch) {
                // Update examNames and save
                existingForm.examNames = updatedExamNames;
                await existingForm.save();
                return res.status(200).json(existingForm);
            }

            // If details differ, create a new registration form
        }

        // Create a new registration form
        const newRegForm = new RegForm({
            name, adhar, email, phone, fatherName, motherName, currentCourse,
            subjects: subjectsArray, dateOfBirth, gender, nationality,
            emergencyContact, previousEducation, permanentAddress, paymentId,
            examNames: examNamesArray
        });

        await newRegForm.save();
        res.status(201).json(newRegForm);
    } catch (error) {
        console.error('Error creating registration form:', error);
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

// Update an existing registration form to add an exam name dynamically
export const updateRegForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { examName } = req.body;

        // Find the form by ID
        const form = await RegForm.findById(id);

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Ensure examNames is an array, then add the new exam if it's not already present
        if (examName && !form.examNames.includes(examName)) {
            form.examNames.push(examName); // Add new exam name to the array
        }

        // Save the updated form
        await form.save();

        res.status(200).json({ message: 'Form updated successfully', form });
    } catch (error) {
        console.error('Error updating form:', error);
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
