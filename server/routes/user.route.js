import express from 'express';

import { getUserId, getUsers, getUser } from '../controllers/user.controller.js';
import { joinClub } from '../controllers/user.controller.js';

const router = express.Router();
router.get('/id', getUserId);
router.get('/all', getUsers);
router.get('/:id', getUser);
router.put('/:clubId/join', joinClub);



export default router;
