// models.js
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// KYC Schema
const kycSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', unique: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
});

// Post Schema
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    content: { type: String, required: true },
});

// Models
const User = mongoose.model('User ', userSchema);
const KYC = mongoose.model('KYC', kycSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { User, KYC, Post };
