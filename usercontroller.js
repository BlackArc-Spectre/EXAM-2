const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const KYC = require('../models/KYC');
const Post = require('../models/Post');

// Register a new user
const registerUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

// Login a user
const loginUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Delete a user and their associated KYC and posts
const deleteUser  = async (req, res) => {
    try {
        await KYC.deleteOne({ user: req.user.id });
        await Post.deleteMany({ user: req.user.id });
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'User  and associated KYC and Posts deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = {
    registerUser ,
    loginUser ,
    deleteUser ,
};
