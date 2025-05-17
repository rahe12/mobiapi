import express from 'express';
import { addCategory, getCategories } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticate, addCategory);
router.get('/', authenticate, getCategories);

export default router;
