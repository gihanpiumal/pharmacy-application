const Store = require("../models/store");
const mongoose = require("mongoose");

exports.getStore = async function (req, res) {
  let request = req.body;

  condition = {
    $and: [
      request.medicineId === ""
        ? {}
        : {
            medicineId: {
              $eq: mongoose.Types.ObjectId(request.medicineId),
            },
          },
    ],
  };

  let stores = await Store.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "medicines",
        localField: "medicineId",
        foreignField: "_id",
        as: "medicineDetails",
      },
    },
    {
      $unwind: {
        path: "$spec",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  if (stores) {
    return res.status(200).json({
      success: true,
      allStors: { stores },
    });
  }
  return res.status(400).json({
    error: err,
  });
};

exports.addStore = function (req, res) {
  let newStore = Store(req.body);

  newStore.save((err, addedData) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Medicine saved succesfullly to store",
      addedData,
    });
  });
};

exports.updateStore = function (req, res) {
  let request = req.body;

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

  Store.findByIdAndUpdate(
    req.params.id,
    {
      $set: request,
    },
    { new: true },
    function (err, updateStore) {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        updateStore,
      });
    }
  );
};

exports.deleteStore = function (req, res) {
  Store.findByIdAndRemove(req.params.id).exec((err, deleteStore) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deleteStore,
    });
  });
};
