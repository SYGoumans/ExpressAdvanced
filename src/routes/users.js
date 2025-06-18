import express from 'express';
import { getAllUsers, createUser, updateUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/', updateUser);

export default router;