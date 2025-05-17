import express from 'express';
import { addExpense, getExpenses, deleteExpense } from '../controllers/expenseController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticate, addExpense);
router.get('/', authenticate, getExpenses);
router.delete('/:id', authenticate, deleteExpense);

export default router;
