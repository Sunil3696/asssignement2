/**
 * File: middleware.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 13-10-24
 */

// Middleware function to validate recipe data in the request body
const validateRecipe = (req, res, next) => {
      // Destructure required fields from the request body
    const {
      recipeName,
      ingredients,
      cookingTime,
      difficulty,
      cuisine,
      description,
      photoLink,
      averageRating,
    } = req.body;
  
    // Check for missing or empty fields
    if (
      !recipeName ||
      !ingredients ||
      !cookingTime ||
      !difficulty ||
      !cuisine ||
      !description ||
      !averageRating
    ) {
      return res // If any required field is missing, send a 400 Bad Request response
        .status(400)
        .send(
          "Missing any of the required fileds recipeName, ingredients, cookingTime,difficulty, cuisine, description,photoLink,averageRating"
        );
    }
  
    next();
  };

  // Export the validation middleware for use in other parts of the application
module.exports = { validateRecipe };