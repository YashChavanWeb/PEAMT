import RegForm from "../models/regform.model.js";

// Create or update a registration form based on Aadhar card
export const createOrUpdateRegForm = async (req, res) => {
    try {
        const { aadharCard, ...formData } = req.body;

        // Check if a registration form with the given Aadhar card exists
        let regForm = await RegForm.findOne({ aadharCard });

        if (regForm) {
            // If the form exists, update it with the new details
            regForm = await RegForm.findByIdAndUpdate(regForm._id, formData, { new: true, runValidators: true });
            res.status(200).json({
                success: true,
                message: 'Registration form updated successfully',
                data: regForm,
            });
        } else {
            // If the form does not exist, create a new one
            regForm = new RegForm({ aadharCard, ...formData });
            await regForm.save();
            res.status(201).json({
                success: true,
                message: 'Registration form created successfully',
                data: regForm,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a registration form by ID
export const getRegFormById = async (req, res) => {
    try {
        const regForm = await RegForm.findById(req.params.id);
        if (!regForm) {
            return res.status(404).json({
                success: false,
                message: 'Registration form not found',
            });
        }
        res.status(200).json({
            success: true,
            data: regForm,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update a registration form by ID
export const updateRegForm = async (req, res) => {
    try {
        const regForm = await RegForm.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!regForm) {
            return res.status(404).json({
                success: false,
                message: 'Registration form not found',
            });
        }
        res.status(200).json({
            success: true,
            data: regForm,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
