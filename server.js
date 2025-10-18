const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const authRouter = require('./routes/auth');
const barbersRouter = require('./routes/barbers');
const bookingsRouter = require('./routes/bookings');
const metricsRouter = require('./routes/metrics');
const auth = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
require('./migrate');

app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/barbers', barbersRouter);
app.use('/api/metrics', auth('admin'), metricsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));