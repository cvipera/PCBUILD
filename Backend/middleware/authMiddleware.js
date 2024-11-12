// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        if (decoded.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = adminMiddleware;
