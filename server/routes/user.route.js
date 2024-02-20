import express from 'express';

import { getUserId, getUsers, getUser } from '../controllers/user.controller.js';


const router = express.Router();
router.get('/id', getUserId);
router.get('/all', getUsers);
router.get('/:id', getUser);


export default router;
