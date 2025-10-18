const express = require('express');
const db = require('../db');
const shortid = require('shortid');
const router = express.Router();

router.get('/', (req, res) => res.json(db.prepare('SELECT * FROM bookings').all()));
router.post('/', (req, res) => {
  const { barber_id, customer_name, customer_phone, address, date, price } = req.body;
  const id = shortid.generate();
  db.prepare('INSERT INTO bookings VALUES (@id,@barber_id,@customer_name,@customer_phone,@address,@date,@price,"pending",@created_at)').run({ id, barber_id, customer_name, customer_phone, address, date, price, created_at: new Date().toISOString() });
  res.json({ success: true });
});
module.exports = router;