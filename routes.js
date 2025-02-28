// routes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, KYC, Post } = require('./models');
const { authenticate } = require('./middleware');

const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Create KYC
router.post('/kyc', authenticate, async (req, res) => {
    const { fullName, address } = req.body;
    try {
        const kyc = new KYC({ user: req.user.id, fullName, address });
        await kyc.save();
        res.status(201).json({ message: 'KYC created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating KYC', error });
    }
});

// Create Post
router.post('/posts', authenticate, async (req, res) => {
    const { content } = req.body;
    try {
        const post = new Post({ user: req.user.id, content });
        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error });
    }
});

// Delete User
router.delete('/user', authenticate, async (req, res) => {
    try {
        await KYC.deleteOne({ user: req.user.id });
        await Post.deleteMany({ user: req.user.id });
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'User  and associated KYC and Posts deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;
