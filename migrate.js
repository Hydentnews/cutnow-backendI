const db = require('./db');
function migrate() {
  db.prepare(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT, role TEXT, created_at TEXT)`).run();
  db.prepare(`CREATE TABLE IF NOT EXISTS barbers (id TEXT PRIMARY KEY, name TEXT, city TEXT, phone TEXT, experience INTEGER, approved INTEGER DEFAULT 0, created_at TEXT)`).run();
  db.prepare(`CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, barber_id TEXT, customer_name TEXT, customer_phone TEXT, address TEXT, date TEXT, price REAL, status TEXT DEFAULT 'pending', created_at TEXT)`).run();
}
migrate();
console.log('✅ Database migration complete.');