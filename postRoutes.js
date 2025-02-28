const express = require('express');
const { authenticate } = require('../middleware');
const { createPost } = require('../controllers/postController');

const router = express.Router();

router.post('/', authenticate, createPost);

module.exports = router;
