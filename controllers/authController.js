import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const [rows] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

  if (!users.length) return res.status(400).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, users[0].password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: users[0].id, email: users[0].email }, process.env.JWT_SECRET);
  res.json({ token });
};
