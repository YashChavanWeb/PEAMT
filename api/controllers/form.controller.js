import Admin from '../models/admin.model.js';
import mongoose from 'mongoose';

// Submit form function
export const submitForm = async (req, res) => {
    try {
        const { college, exam, email, phone, description } = req.body;

        const newAdmin = new Admin({
            college,
            exam,
            email,
            phone,
            description
        });

        await newAdmin.save();
        res.status(201).json({ success: true, message: 'Admin data submitted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Other controller functions...

export const getAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        next(error);
    }
};

export const getAdminById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }
        res.status(200).json({ success: true, data: admin });
    } catch (error) {
        next(error);
    }
};

export const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
    const { college, exam, email, phone, description } = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, {
            college,
            exam,
            email,
            phone,
            description
        }, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true, message: 'Admin updated successfully', data: updatedAdmin });
    } catch (error) {
        next(error);
    }
};

export const deleteAdmin = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true, message: 'Admin deleted successfully' });
    } catch (error) {
        next(error);
    }
};