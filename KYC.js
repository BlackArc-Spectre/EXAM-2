const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', unique: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
});

const KYC = mongoose.model('KYC', kycSchema);
module.exports = KYC;
