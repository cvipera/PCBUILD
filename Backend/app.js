// app.js
require('dotenv').config();
const express = require('express');
const db = require('./config/db'); // Initialize DB connection
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
