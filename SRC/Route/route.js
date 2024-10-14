/**
 * File: route.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 13-10-24
 */
// Import the express module to create a router
const express  = require('express');
const router = express.Router(); // Create a new router instance

// Import the controller functions for handling recipe requests
const {getRecipe, postrecipe, deleteRecipe, updateRecipe, getRecipeonId} = require('../Controller/Controller');

router.get('/getall', getRecipe); // Fetch all recipes

router.post('/createNew', postrecipe); // Add a new recipe

router.put('/:id',updateRecipe) // Update recipe with given ID
router.delete('/:id', deleteRecipe) // Delete recipe with given ID
router.get('/:id', getRecipeonId) // Fetch recipe with given ID

module.exports = router; // Makes the router available to other modules