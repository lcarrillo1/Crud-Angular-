const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: String,
    password: String,
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
