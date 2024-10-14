/**
 * File: index.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 13-10-24
 */
// Import libraries and modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./SRC/Route/route');
const session = require('express-session')
const authRoutes = require('./SRC/Route/userRoute');

//Initialize the express app
const app = express();

//MongoDb Atlas connection string
const mongoURI = 'mongodb+srv://Kanchan:Kanchan@cluster0.v3lhx.mongodb.net/';

//connect to mongodb Atlas
mongoose.connect(mongoURI,{
})
.then(()=>{
    console.log('Connected to mongodb');
})
.catch((error)=>{
    console.error('Error connecting to mongoDB',error);
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Configure the express-session middleware
app.use(
    session({
        secret: "Kanchan",
        resave: false,
        saveUninitialized: false,
    })
);

// Use the imported routes for handling requests
app.use('/api/',routes);
app.use('/api/user', authRoutes);

// Define the port for the server
const port = 3000;

// Start the server and listen on the defined port
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
});
