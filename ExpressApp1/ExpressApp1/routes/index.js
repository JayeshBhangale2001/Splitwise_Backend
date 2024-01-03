// Update your routes/index.js file to serve the login page at the root URL
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Server is running.');
});

module.exports = router;