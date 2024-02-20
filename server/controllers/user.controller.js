import mongoose from "mongoose";
import User from "../models/etudiant.model.js";
import jwt from "jsonwebtoken";

// Function to get user ID from JWT token
export const getUserId = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie;
        
        if (!cookieHeader) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        
        const token = cookieHeader.split('=')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const id = decoded.id;
        console.log(id);
        return res.status(200).json({ success: true, id });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

// Get a single user
export const getUser = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
}
