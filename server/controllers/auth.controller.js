import User from '../models/etudiant.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res , next) => {
    const { identityCard , grade , email ,phoneNumber , userName, password } = req.body;
    //test if the user already exists ( email , identityCard , phoneNumber , userName )
    try {
        const user = await User
        .findOne({ $or: [{ email }, { identityCard }, { phoneNumber }, { userName }] });
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new User({ identityCard, grade, email, phoneNumber, userName, password: hashedPassword, clubs: [], accountType: 'etudiant' });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}



export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user
        = await
        User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: false });
        res.status(200).json({ message: 'Logged in successfully' });
    }
    catch (error) {
        next(error);
    }
}

