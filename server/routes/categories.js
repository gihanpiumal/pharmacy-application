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

  newCategories.save((err,addedData) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Categories saved Succesfullly",
      addedData
    });
  });
};

exports.updateCategory = function (req, res) {
  let request = req.body;

  {
    request.categoryName == null || request.categoryName === ""
      ? delete request.categoryName
      : (request.categoryName = request.categoryName);
  }
  {
    request.Description == null || request.Description === ""
      ? delete request.Description
      : (request.Description = request.Description);
  }

  Categories.findByIdAndUpdate(
    req.params.id,
    {
      $set: request,
    },
    { new: true },
    function (err, updateCategory) {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        updateCategory,
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
