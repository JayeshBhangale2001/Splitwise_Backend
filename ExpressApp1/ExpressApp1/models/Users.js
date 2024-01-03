const mongoose = require('mongoose');

// Define the schema for the Users collection
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // Other fields for the user
});

// Create a model based on the schema for the 'Users' collection
const Users = mongoose.model('Users', userSchema, 'Users');


module.exports = Users;
