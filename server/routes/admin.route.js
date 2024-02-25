import express from 'express';
import { login } from '../controllers/admin.controller.js';
import { logout } from '../controllers/admin.controller.js';
import { getAdminId } from '../controllers/admin.controller.js';
import { getAdminData } from '../controllers/admin.controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/id', getAdminId);
router.get('/data/:id', getAdminData);

const verifyAdmin = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie;
 

        if (!cookieHeader) {
            return res.json({ success: false, message: 'Admin not authenticated' });
        }
        const token = cookieHeader.split('=')[1];

        if (!token) {
            return res.json({ success: false, message: 'Admin not authenticated' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.json({ success: false, message: 'Admin not authenticated' });
        }
        next();
    }
    catch (error) {
        next(error);
    }
}

router.get('/verify', verifyAdmin, (req, res) => {
    console.log(verifyAdmin);
    res.json({ success: true, message: 'Admin authenticated' });
});



export default router;
