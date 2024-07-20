import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ username, email, password: hashPassword });

    try {
        await user.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
        res.status(500).json(error.message)
    }

};