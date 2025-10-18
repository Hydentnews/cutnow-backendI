const express = require('express');
const db = require('../db');
const router = express.Router();
router.get('/', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM bookings').get().c;
  const pending = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='pending'").get().c;
  res.json({ total, pending });
});
module.exports = router;