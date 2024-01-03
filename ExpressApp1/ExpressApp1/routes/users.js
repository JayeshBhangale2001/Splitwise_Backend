const express = require('express');
const router = express.Router();
const Users = require('../models/Users'); // Assuming this path points to your Users model file

// POST route for user login
router.post('/login', async (req, res) => {
    console.log('Request Body:', req.body); 
    const { email, password } = req.body;

    try {
        // Search for the user in the Users collection by email
        console.log('Searching for user with email:', email);
        const user = await Users.findOne({ username: email });

        console.log('User found:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches the stored hashed password
        if (password === user.password) {
            // Passwords match - user successfully logged in
            return res.status(200).json({ message: 'Login successful' });
        } else {
            // Passwords don't match
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
