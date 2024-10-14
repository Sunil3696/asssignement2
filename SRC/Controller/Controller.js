/**
 * File: Controller.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 13-10-24
 */
const recipes = require ('../Models/recipe');

const getRecipe = async (req, res) => {
    try {
        const RecipeData = await recipes.find();  // Fetch all recipes from MongoDB collection
      
        res.status(200).json(RecipeData);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to recieve recipes', error: error.message }); // If any error occurs, send a 500 response with the error message
    }
}

const postrecipe = async (req, res) => {
    const { recipeName, ingredients, cookingTime, difficulty, cuisine, description, photoLink, averageRating } = req.body;
    const newRecipe = new recipes({      // Create a new Recipe instance using the request body data
        recipeName,
        ingredients,
        cookingTime,
        difficulty,
        cuisine,
        description,
        photoLink,
        averageRating
    });

    try {
        const savedData  = await newRecipe.save();
        res.status(201).json(savedData)   // Return the saved recipe data in JSON format with a 201 status code (created successfully)
    }
    catch (error){
        res.status(400).json({ message: 'Request Unsuccessfull', error: error.message });
    }
}




 //Delete a single recipes by Id
 const deleteRecipe = async(req,res) =>{
    try{
        const deletedRecipe = await recipes.findByIdAndDelete(req.params.id);
        if(!deletedRecipe){
            return res.status(404).send('Recipe not found');
        }
        res.status(201).json(deletedRecipe);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error deleting the Recipes');
    }
    };

//Update recipes by Id
const updateRecipe = async(req,res) =>{
    try{
        const updatedRecipe = await recipes.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedRecipe){
            return res.status(404).send('Recipe is not updated');
        }
        res.status(201).json(updatedRecipe);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error updating the Recipes');
    }
    };

const getRecipeonId = async(req,res) =>{
        try{
            const Recipe = await recipes.findById(req.params.id);
            if(!recipes){
                return res.status(404).send('Recipe is not found');
            }
            res.status(201).json(Recipe);
        
        }
        catch(e){
            console.error(e);
            res.status(500).send('Error retrieving the Recipe');
        }
        };

// Export the controller functions for use in the routes
module.exports = {getRecipe, postrecipe, deleteRecipe, updateRecipe, getRecipeonId};
