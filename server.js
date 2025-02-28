const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const kycRoutes = require('./routes/kycRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
