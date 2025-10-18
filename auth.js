const express = require('express');
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cutnow_secret_key';

const createToken = (u) => jwt.sign({ id: u.id, role: u.role }, JWT_SECRET, { expiresIn: '7d' });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email=?').get(email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid password' });
  res.json({ token: createToken(user), role: user.role });
});

module.exports = router;