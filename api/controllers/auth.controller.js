// Import necessary modules and dependencies
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'; // Import your User model
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Function to handle user registration
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Validate req.body fields here if needed

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashPassword = bcryptjs.hashSync(password, 10);

        // Create a new user instance
        const newUser = new User({ username, email, password: hashPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        return next(error);
    }
};


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate req.body fields here if needed

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not found")); // Assuming errorHandler is defined correctly
        }

        // Compare passwords
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token with expiration (1 hour)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookie (httpOnly)
        res.cookie('access_token', token, { httpOnly: true });

        // Respond with a success message and user data (excluding sensitive fields)
        const { password: hashPassword, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ message: "User signed in successfully", user: userWithoutPassword });
    } catch (error) {
        // Handle errors
        console.error('Error signing in user:', error);
        return next(error); // Pass the error to the next middleware
    }
};


export const google = async (req, res, next) => {
    try {
        const { email, name, photo } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('access_token', token, { httpOnly: true });

            const { password: hashPassword, ...userWithoutPassword } = user.toObject();
            return res.status(200).json({ message: "User signed in successfully", user: userWithoutPassword });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            // Generate a username from name
            const username = name.toLowerCase().replace(/\s/g, "") + Math.floor(Math.random() * 10000).toString();

            // Create a new user instance
            const newUser = new User({ username, email, password: hashedPassword, profilePicture: photo });

            await newUser.save();

            // Now generate token after saving user
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('access_token', token, { httpOnly: true });

            // Respond with user data
            const { password: hashPassword, ...userWithoutPassword } = newUser.toObject();
            return res.status(200).json({ message: "User signed in successfully", user: userWithoutPassword });
        }
    } catch (error) {
        console.error('Error signing in with Google:', error);
        return next(error); // Pass the error to the next middleware
    }
}
