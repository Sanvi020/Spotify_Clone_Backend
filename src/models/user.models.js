// The file tells us the type of data we are going to store in the database and also the structure of the data. It is a blueprint for the data that we are going to store in the database. It is used to create a model which is used to interact with the database.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
         type: String,  
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'artist', 'admin'],
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;