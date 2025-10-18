const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'cutnow_secret_key';
function auth(role = null) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token' });
    try {
      const token = header.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      if (role && decoded.role !== role) return res.status(403).json({ error: 'Forbidden' });
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}
module.exports = auth;