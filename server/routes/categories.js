const Categories = require("../models/category");
const mongoose = require("mongoose");

exports.getCategories = async function (req, res) {
  let request = req.body;

  condition = {
    $and: [
      request.categoryName === ""
        ? {}
        : {
            categoryName: request.categoryName,
          },
    ],
  };

  let categories = await Categories.aggregate([{ $match: condition }]);

  if (categories) {
    return res.status(200).json({
      success: true,
      allCategory: { categories },
    });
  }
  return res.status(400).json({
    error: err,
  });
};

exports.addCategory = function (req, res) {
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
};

exports.updateCategory = function (req, res) {
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
};

exports.deleteCategory = function (req, res) {
  Categories.findByIdAndRemove(req.params.id).exec((err, deleteCategory) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deleteCategory,
    });
  });
};
