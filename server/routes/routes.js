const express = require("express");
const mongoose = require("mongoose");

const Categories = require("../models/category");
const Medicines = require("../models/medicines");
const router = express.Router();

// get all category
router.post("/api/category/get-all", async (req, res) => {
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

// update category
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

// add new medicine

router.post("/api/medicine/new/add", (req, res) => {
  let newMedicine = Medicines(req.body);

  newMedicine.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Medicine saved Succesfullly",
    });
  });
});

// get all medicines
router.post("/api/medicines/get-all", async (req, res) => {
  let request = req.body;

  condition = {
    $and: [
      request.name === ""
        ? {}
        : {
            name: request.name,
          },
      request.doctrorApproval === "" || request.doctrorApproval == null
        ? {}
        : {
            doctrorApproval: request.doctrorApproval,
          },
      request.categoryId === ""
        ? {}
        : {
            categoryId: {
              $eq: mongoose.Types.ObjectId(request.categoryId),
            },
          },
    ],
  };

  let categories = await Medicines.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$spec",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  if (categories) {
    return res.status(200).json({
      success: true,
      allCategory: { categories },
    });
  }
  return res.status(400).json({
    error: err,
  });
});


// delete medicine
router.delete("/api/medicine/delete/:id", (req, res) => {
  Medicines.findByIdAndRemove(req.params.id).exec((err, deleteMedicine) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deleteMedicine,
    });
  });
});

// update category
router.put("/api/medicine/update/:id", (req, res) => {
  Medicines.findByIdAndUpdate(
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
