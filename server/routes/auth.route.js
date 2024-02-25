import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/signup',signup);
router.post('/login',login);


const verifyUser = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie;
        console.log(cookieHeader);

        if (!cookieHeader) {
            return res.json({ success: false, message: 'User not authenticated' });
        }
        const token = cookieHeader.split('=')[1];

        if (!token) {
            return res.json({ success: false, message: 'User not authenticated' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.json({ success: false, message: 'User not authenticated' });
        }
        next();
    }
    catch (error) {
        next(error);
    }
}



router.get('/verify', verifyUser, (req, res) => {
    res.json({ success: true, message: 'User authenticated' });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'User logged out' });
});


export default router;