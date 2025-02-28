const Post = require('../models/Post');

// Create a post for a user
const createPost = async (req, res) => {
    const { content } = req.body;
    try {
        const post = new Post({ user: req.user.id, content });
        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error });
    }
};

module.exports = { createPost };
