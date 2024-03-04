import express from 'express';

import { createClub } from '../controllers/club.controller.js';
import { getClubs } from '../controllers/club.controller.js';
import { getClub } from '../controllers/club.controller.js';
import { updateClub } from '../controllers/club.controller.js';
import { deleteClub } from '../controllers/club.controller.js';
import { addMember } from '../controllers/club.controller.js';
import { joinClub } from '../controllers/user.controller.js';
import { getClubByName } from '../controllers/club.controller.js';
import { sendNotification } from '../controllers/club.controller.js';
import { addNews } from '../controllers/club.controller.js';
import { addEvent } from '../controllers/club.controller.js';
import { getClubNews } from '../controllers/club.controller.js';
const router = express.Router();

router.post('/create-club', createClub);
router.get('/clubs', getClubs);
router.get('/clubs/:id', getClub);
router.put('/clubs/:id', updateClub);
router.delete('/clubs/delete/:id', deleteClub);
router.put('/clubs/:id/add-member', addMember);
router.put('/clubs/:clubId/join', joinClub);
router.get('/clubs/name/:clubName', getClubByName);
router.put('/clubs/send-notification/:clubId', sendNotification);
router.put('/clubs/:clubId/add-news', addNews);
router.put('/clubs/:clubId/add-event', addEvent);
router.get('/clubs/:clubId/news', getClubNews);




export default router;
