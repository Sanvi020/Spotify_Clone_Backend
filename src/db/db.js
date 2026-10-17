const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
    console.error('Database connection error:', error);
    console.error('Error name:', error.name);
    console.error('Error reason:', error.reason);
    throw error;
}
}

module.exports = connectDB;