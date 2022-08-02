const express = require("express");
const mongoose = require("mongoose");

const Categories = require("../models/category");
const router = express.Router();

// add user
router.post("/api/category/add", (req, res) => {
  let newCategories = Categories(req.body);

  newCategories.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Categories saved Succesfullly",
    });
  });
});

module.exports = router;
