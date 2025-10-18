const express = require('express');
const db = require('../db');
const shortid = require('shortid');
const router = express.Router();

router.get('/', (req, res) => {
  const barbers = db.prepare('SELECT * FROM barbers WHERE approved=1').all();
  res.json(barbers);
});
router.post('/', (req, res) => {
  const { name, city, phone, experience } = req.body;
  const id = shortid.generate();
  db.prepare('INSERT INTO barbers VALUES (@id,@name,@city,@phone,@experience,0,@created_at)').run({ id, name, city, phone, experience, created_at: new Date().toISOString() });
  res.json({ success: true });
});
module.exports = router;