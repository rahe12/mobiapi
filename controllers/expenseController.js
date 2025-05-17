import { db } from '../config/db.js';

export const addExpense = async (req, res) => {
  const { amount, category_id, note, expense_date } = req.body;
  await db.execute(
    'INSERT INTO expenses (user_id, category_id, amount, note, expense_date) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, category_id, amount, note, expense_date]
  );
  res.json({ message: 'Expense added' });
};

export const getExpenses = async (req, res) => {
  const [rows] = await db.execute(
    'SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC',
    [req.user.id]
  );
  res.json(rows);
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  await db.execute('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, req.user.id]);
  res.json({ message: 'Expense deleted' });
};
