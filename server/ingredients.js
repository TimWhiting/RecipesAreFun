const mongoose = require("mongoose");
const express = require("express");
const auth = require("./auth.js");
const users = require("./users.js");
const router = express.Router();

const User = users.model;

const ingredientTypeSchema = new mongoose.Schema({
  isWet: {
    type: Boolean,
    default: true
  },
  isIndividual: {
    type: Boolean,
    default: true
  }
});

const ingredientSchema = new mongoose.Schema({
  name: String,
  type: {
    type: mongoose.Schema.ObjectId,
    ref: "IngredientType"
  },
  grocerySection: String
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
const IngredientType = mongoose.model("IngredientType", ingredientTypeSchema);

router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  let type = IngredientType.find({
    isWet: req.body.isWet,
    isIndividual: req.body.isIndividual
  });
  if (type == null) {
    type = new IngredientType({
      isWet: req.body.isWet,
      isIndividual: req.body.isIndividual
    });
  }
  const ingredient = new Ingredient({
    name: req.body.title,
    type: type._id,
    grocerySection: req.body.grocerySection
  });
  try {
    await ingredient.save();
    res.send(ingredient);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the recipe database.
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let ingredients = await Ingredient.find().populate("type");
    res.send(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item in the recipe database.
router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    await Ingredient.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update an item in the recipe database.
router.put("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let ingredient = await Ingredient.findOne({ _id: req.params.id });
    ingredient.name = req.body.name;
    ingredient.type = req.body.type._id;
    ingredient.grocerySection = req.body.grocerySection;
    ingredient.save();
    res.send(ingredient);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Ingredient,
  routes: router
};
