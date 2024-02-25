import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const adminEmail = email;
    const adminPassword = password;

    try {
        const admin = await Admin.findOne
        ({ adminEmail });
        if (!admin) {
            const error = new Error('Admin not found');
            error.statusCode = 404;
            throw error;
        }
        const isMatch = adminPassword === admin.adminPassword;
        if (!isMatch) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ id: admin._id }, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: false });
        res.status(200).json({ message: 'Logged in successfully' });
    }
    catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}

export const getAdminId = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie;
        
        if (!cookieHeader) {
            return res.status(401).json({ success: false, message: 'Admin not authenticated' });
        }
        
        const token = cookieHeader.split('=')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const id = decoded.id;
   
        return res.status(200).json({ success: true, id });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}
  

export const getAdminData = async (req, res, next) => {
    const {id} = req.params;

    try {
        const admin = await Admin.findById(id);
        console.log(admin);
        res.status(200).json(admin);
    }
    catch (error) {
        next(error);
    }
}

export const updateAdminData = async (req, res, next) => {
    const adminId = req.userId;
    const { adminEmail, adminPassword } = req.body;
    try {
        const admin = await Admin.findById(adminId);
        admin.adminEmail = adminEmail;
        admin.adminPassword = adminPassword;
        await admin.save();
        res.status(200).json({ message: 'Admin data updated successfully' });
    }
    catch (error) {
        next(error);
    }
}


