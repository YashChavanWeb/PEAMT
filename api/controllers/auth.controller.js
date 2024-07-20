import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ username, email, password: hashPassword });

    try {
        await user.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
        console.error('Error saving user:', error.message);
        // Pass the error to the next middleware (error handling middleware)
        return next(error);
    }
};
