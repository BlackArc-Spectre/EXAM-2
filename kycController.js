const KYC = require('../models/KYC');

// Create KYC for a user
const createKYC = async (req, res) => {
    const { fullName, address } = req.body;
    try {
        const kyc = new KYC({ user: req.user.id, fullName, address });
        await kyc.save();
        res.status(201).json({ message: 'KYC created successfully', kyc });
    } catch (error) {
        res.status(400).json({ message: 'Error creating KYC', error });
    }
};

module.exports = { createKYC };
