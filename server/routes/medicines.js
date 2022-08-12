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

  let Medicine = await Medicines.aggregate([
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

  if (Medicine) {
    return res.status(200).json({
      success: true,
      allMedicines: { Medicine },
    });
  }
  return res.status(400).json({
    error: err,
  });
};

exports.addMedicine = function (req, res) {
  let newMedicine = Medicines(req.body);

  newMedicine.save((err,addedData) => {
    if (err) {
      return res.status(400).json({
        error: err,
        
      });
    }
    return res.status(200).json({
      success: "Medicine saved Succesfullly",
      addedData
    });
  });
};

exports.updateMedicine = function (req, res) {
  let request = req.body;

  {
    request.name == null || request.name === ""
      ? delete request.name
      : (request.name = request.name);
  }
  {
    request.description == null || request.description === ""
      ? delete request.description
      : (request.description = request.description);
  }
  {
    request.doctrorApproval == null || request.doctrorApproval === ""
      ? delete request.doctrorApproval
      : (request.doctrorApproval = request.doctrorApproval);
  }
  {
    request.price == null || request.price === ""
      ? delete request.price
      : (request.price = request.price);
  }
  {
    request.quantity == null || request.quantity === ""
      ? delete request.quantity
      : (request.quantity = request.quantity);
  }

  Medicines.findByIdAndUpdate(
    req.params.id,
    {
      $set: request,
    },
    (err, updateCategory) => {
      if (err,C) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        updateCategory
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
