import RegForm from '../models/RegForm.js';

export const createRegForm = async (req, res) => {
    try {
        const {
            name,
            adhar,
            email,
            phone,
            fatherName,
            motherName,
            currentCourse,
            subjects,
            dateOfBirth,
            gender,
            nationality,
            emergencyContact,
            previousEducation,
            permanentAddress,
            paymentId
        } = req.body;

        if (!name || !adhar || !email || !phone || !fatherName || !motherName || !currentCourse || !subjects || !dateOfBirth || !gender || !nationality || !emergencyContact || !previousEducation || !permanentAddress || !paymentId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Ensure `subjects` is an array
        const subjectsArray = Array.isArray(subjects) ? subjects : [];

        const newRegForm = new RegForm({
            name,
            adhar,
            email,
            phone,
            fatherName,
            motherName,
            currentCourse,
            subjects: subjectsArray,
            dateOfBirth,
            gender,
            nationality,
            emergencyContact,
            previousEducation,
            permanentAddress,
            paymentId
        });

        await newRegForm.save();
        res.status(201).json(newRegForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

export const updateRegForm = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Ensure `subjects` is an array if it exists in the updateData
        if (updateData.subjects) {
            updateData.subjects = Array.isArray(updateData.subjects) ? updateData.subjects : [];
        }

        const updatedRegForm = await RegForm.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRegForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(updatedRegForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
