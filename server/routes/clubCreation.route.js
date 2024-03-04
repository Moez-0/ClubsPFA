import express from 'express';

import { createClubCreationRequest } from '../controllers/clubCreationRequest.controller.js';
import { getClubCreationRequests } from '../controllers/clubCreationRequest.controller.js';
import { acceptClubCreationRequest , rejectClubCreationRequest } from '../controllers/clubCreationRequest.controller.js';
import { clearClubCreationRequests } from '../controllers/clubCreationRequest.controller.js';
const router = express.Router();

router.post('/create-club-creation-request', createClubCreationRequest);
router.get('/club-creation-requests', getClubCreationRequests);
router.post('/accept/:id', acceptClubCreationRequest);
router.post('/reject/:id', rejectClubCreationRequest);
router.delete('/clear', clearClubCreationRequests);



export default router;
