import { db } from '../config/db.js';

export const addCategory = async (req, res) => {
  const { name, icon } = req.body;
  await db.execute(
    'INSERT INTO categories (user_id, name, icon) VALUES (?, ?, ?)',
    [req.user.id, name, icon]
  );
  res.json({ message: 'Category added' });
};

export const getCategories = async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM categories WHERE user_id = ?', [req.user.id]);
  res.json(rows);
};
