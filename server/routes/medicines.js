const Medicines = require("../models/medicines");
const mongoose = require("mongoose");

exports.getMedicines = async function (req, res) {
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
};

exports.addMedicine = function (req, res) {
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
};

exports.updateMedicine = function (req, res) {
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
};

exports.deleteMedicine = function (req, res) {
  Medicines.findByIdAndRemove(req.params.id).exec((err, deleteMedicine) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deleteMedicine,
    });
  });
};
