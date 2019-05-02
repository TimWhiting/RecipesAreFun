const mongoose = require("mongoose");
const express = require("express");
const auth = require("./auth.js");
const users = require("./users.js");
const router = express.Router();

const User = users.model;

const groceryItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  ingredient: {
    type: mongoose.Schema.ObjectId,
    ref: "Ingredient"
  },
  amount: {
    type: String,
    required: true
  }
});

const GroceryItem = mongoose.model("GroceryItem", groceryItemSchema);

router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  const item = new GroceryItem({
    user: req.body.user,
    ingredient: req.body.ingredient,
    amount: req.body.amount
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let ingredients = await GroceryItem.find()
      .populate("user")
      .populate("ingredient");
    res.send(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    await GroceryItem.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update an item in the recipe database.
router.put("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let item = await GroceryItem.findOne({ _id: req.params.id });
    item.amount = req.body.amount;
    item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: GroceryItem,
  routes: router
};
