// This file contains the logic for all the api where the artist/user can register and login
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {

    const{username, email, password, role = 'user'} = req.body;


    const isUserExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if (isUserExist) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        username,
        email,
        password: hash,
        role
    });

    const jwttoken = jwt.sign({id: newUser._id, role: newUser.role}, process.env.JWT_SECRET);

    const savedUser = await newUser.save();
    res.cookie('token', jwttoken)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            role: savedUser.role
        },
    })

}

async function loginUser(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if (!user) {
        return res.status(400).json({message: 'User does not exist'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database

    if (!isPasswordValid) {
        return res.status(400).json({message: 'Invalid password'});
    }

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}

async function logout(req,res){
    res.clearCookie("token"),
    res.status(201).json({
        message : "User logged out succesfully"
    })
}

module.exports = {registerUser, loginUser, logout};