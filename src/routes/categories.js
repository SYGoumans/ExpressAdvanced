import express from 'express';
import { getAllCategories, createCategories, updateCategorie } from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategories);
router.put('/', updateCategorie);

export default router;