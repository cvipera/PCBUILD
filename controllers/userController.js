// controllers/userController.js
const db = require('../config/db');

// Register new user
exports.registerUser = (req, res) => {
    const { username, email, password, userType = 'visitor' } = req.body;
    const query = 'INSERT INTO users (username, email, password, userType) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password, userType], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
};

// Update user type (admin only)
exports.updateUserType = (req, res) => {
    const { userId, newUserType } = req.body;
    const validUserTypes = ['admin', 'builder', 'visitor'];
    if (!validUserTypes.includes(newUserType)) {
        return res.status(400).json({ message: 'Invalid userType' });
    }

    const query = 'UPDATE users SET userType = ? WHERE id = ?';
    db.query(query, [newUserType, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User type updated successfully' });
    });
};
