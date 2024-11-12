// controllers/userController.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');

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

// Login function
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        // Check if user exists and password matches
        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // User exists and password is correct
        const user = results[0];
        const token = jwt.sign(
            { id: user.id, email: user.email, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({
            message: 'Login successful',
            token: token,       // Send token in response
            userType: user.userType
        });
    });
};
