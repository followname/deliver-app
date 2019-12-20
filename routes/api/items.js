const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')

//Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create A Post
// @access Private
router.post("/", auth, (req, res) => {
  const { name, domestic, international, price } = req.body;
  const newItem = new Item({
    name,
    domestic,
    international,
    price
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete A Item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ succes: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
