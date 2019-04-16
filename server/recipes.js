const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const auth = require("./auth.js");
const users = require("./users.js");
const router = express.Router();

const User = users.model;
// Configure multer so that it will upload to '/public/images'

const isLocal = true;
const isTim = true;

var upload = undefined;
if (isLocal) {
  upload = multer({
    dest: "./public/images/",
    limits: {
      fileSize: 10000000
    }
  });
} else {
  if (isTim) {
    upload = multer({
      dest: "/var/www/cp4.twhiting.org/images/",
      limits: {
        fileSize: 10000000
      }
    });
  } else {
    upload = multer({
      dest: "/var/www/cp4.mycs260website.com/images/",
      limits: {
        fileSize: 10000000
      }
    });
  }
}

// Create a scheme for recipes in the recipe collection: a title and a path to an image.
const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  title: String,
  imagePath: String,
  instructions: [String],
  ingredients: [String]
});
// Create a model for recipes in the recipe collection.
const Recipe = mongoose.model("Recipe", recipeSchema);

// Create a new item in the recipe database: takes a title and a path to an image.
router.post(
  "/",
  auth.verifyToken,
  User.verify,
  upload.single("photo"),
  async (req, res) => {
    const recipe = new Recipe({
      user: req.user,
      title: req.body.recipe.title,
      imagePath: "/images/" + req.file.filename,
      instructions: req.body.recipe.instructions,
      ingredients: req.body.recipe.ingredients
    });
    try {
      await recipe.save();
      res.send(recipe);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

// Get a list of all of the items in the recipe database.
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item in the recipe database.
router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update an item in the recipe database.
router.put("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });
    recipe.title = req.body.title;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Recipe,
  routes: router
};
