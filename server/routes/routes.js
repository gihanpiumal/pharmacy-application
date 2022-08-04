const express = require("express");
const mongoose = require("mongoose");

const {getCategories} = require("./Categories");
const Categories = require("../models/category");
const router = express.Router();


// get all category
router.get("/api/category/get-all", (req, res) => {
    Categories.find().exec((err, category) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        allCategory: {category},
      });
    });
  });



// add category
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


  
// delete category
router.delete("/api/category/delete/:id", (req, res) => {
    Categories.findByIdAndRemove(req.params.id).exec((err, deleteCategory) => {
      if (err) {
        return res.status(400).json({ message: "Not deleted", err });
      }
      return res.json({
        message: "Delete Successfully",
        deleteCategory,
      });
    });
  });


  // update user
  router.put("/api/category/update/:id", (req, res) => {
    Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (err, updateCategory) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        return res.status(200).json({
          success: "Updated Successfully",
        });
      }
    );
  });
  

module.exports = router;
