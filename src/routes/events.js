import express from 'express';
import { getAllEvents, createEvent, updateEvent } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/', updateEvent);

export default router;