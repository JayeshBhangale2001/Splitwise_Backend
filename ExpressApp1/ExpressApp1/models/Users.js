const mongoose = require('mongoose');

// Define the schema for the Users collection
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // Other fields for the user
});

// Create a model based on the schema for the 'Users' collection
const Users = mongoose.model('Users', userSchema, 'Users');
Users.createUser = async function (username, password) {
    try {
        const newUser = new this({ username, password });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
};

module.exports = Users;
