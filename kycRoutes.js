const express = require('express');
const { authenticate } = require('../middleware');
const { createKYC } = require('../controllers/kycController');

const router = express.Router();

router.post('/', authenticate, createKYC);

module.exports = router;
