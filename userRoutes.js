const express = require('express');
const { authenticate } = require('../middleware');
const {
    registerUser,
    loginUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/user', authenticate, deleteUser);

module.exports = router;
