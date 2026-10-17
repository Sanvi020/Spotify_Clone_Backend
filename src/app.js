// This file contains middlewares and routes for the application
const express = require('express');
const cookieParser = require('cookie-parser');
const authroutes = require('./routes/auth.routes');
const musicroutes = require('./routes/music.routes');


// Middleware firsts
const app = express();
app.use(cookieParser());
app.use(express.json());


// Routes after middlewares
app.use('/api/auth', authroutes);
app.use('/api/music', musicroutes);

module.exports = app;
