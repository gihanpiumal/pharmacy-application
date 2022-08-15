const Purchase = require("../models/perchesStore");
const mongoose = require("mongoose");

exports.getPurchase = async function (req, res) {
  let request = req.body;

  condition = {
    $and: [
      request.purchaseNo === ""
        ? {}
        : {
            purchaseNo: request.purchaseNo,
          },
      request.categoryId === ""
        ? {}
        : {
            categoryId: {
              $eq: mongoose.Types.ObjectId(request.categoryId),
            },
          },
      request.medicineId === ""
        ? {}
        : {
            medicineId: {
              $eq: mongoose.Types.ObjectId(request.medicineId),
            },
          },
      request.date === ""
        ? {}
        : {
            date: request.date,
          },
      request.userId === ""
        ? {}
        : {
            userId: request.userId,
          },
      request.addToStore === "" || request.addToStore == null
        ? {}
        : {
            addToStore: request.addToStore,
          },
    ],
  };

  let purchase = await Purchase.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "Category",
      },
    },
    {
      $unwind: {
        path: "$spec",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "medicines",
        localField: "medicineId",
        foreignField: "_id",
        as: "Medicines_details",
      },
    },
    {
      $unwind: {
        path: "$spec",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "User_details",
      },
    },
    {
      $unwind: {
        path: "$spec",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  if (purchase) {
    return res.status(200).json({
      success: true,
      allPurchase: { purchase },
    });
  }
  return res.status(400).json({
    error: err,
  });
};

exports.addPurchase = function (req, res) {
  let newPurchase = Purchase(req.body);

  newPurchase.save((err,addedData) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "New Purchase saved Succesfullly",
      addedData
    });
  });
};

exports.updatePurchase = function (req, res) {
  let request = req.body;

  {
    request.purchaseNo == null || request.purchaseNo === ""
      ? delete request.purchaseNo
      : (request.purchaseNo = request.purchaseNo);
  }
  {
    request.userId == null || request.userId === ""
      ? delete request.userId
      : (request.userId = request.userId);
  }
  {
    request.addToStore == null || request.addToStore === ""
      ? delete request.addToStore
      : (request.addToStore = request.addToStore);
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

  Purchase.findByIdAndUpdate(
    req.params.id,
    {
      $set: request,
    },
    (err, updatePurchaseStore) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        updatePurchaseStore
      });
    }
  );
};

exports.deletePurchase = function (req, res) {
    Purchase.findByIdAndRemove(req.params.id).exec((err, deletePurchase) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deletePurchase,
    });
  });
};
