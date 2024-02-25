import express from 'express';

import { createClub } from '../controllers/club.controller.js';
import { getClubs } from '../controllers/club.controller.js';
import { getClub } from '../controllers/club.controller.js';
import { updateClub } from '../controllers/club.controller.js';
import { deleteClub } from '../controllers/club.controller.js';
import { addMember } from '../controllers/club.controller.js';

const router = express.Router();

router.post('/create-club', createClub);
router.get('/clubs', getClubs);
router.get('/clubs/:id', getClub);
router.put('/clubs/:id', updateClub);
router.delete('/clubs/delete/:id', deleteClub);
router.put('/clubs/:id/add-member', addMember);


export default router;
