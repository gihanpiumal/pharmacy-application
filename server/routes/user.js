const User = require("../models/user");
const joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

exports.getUser = async function (req, res) {
  let request = req.body;

  condition = {
    $and: [
      request.firstName === ""
        ? {}
        : {
            firstName: request.firstName,
          },
      request.userRoleId === ""
        ? {}
        : {
            userRoleId: {
              $eq: mongoose.Types.ObjectId(request.userRoleId),
            },
          },
    ],
  };

  let user = await User.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "userroles",
        localField: "userRoleId",
        foreignField: "_id",
        as: "userRole",
      },
    },
    {
      $unwind: {
        path: "$spec",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  if (user) {
    return res.status(200).json({
      success: true,
      allUsers: { user },
    });
  }
  return res.status(400).json({
    error: err,
  });
};

exports.addUser = function (req, res) {
  let newUser = User(req.body);
  const saltRounds = 10;

  const hashPassword = "";

  bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(newUser.password, salt, function (hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          newUser.password = hash;

          newUser.save((err,addedData) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
            return res.status(200).json({
              success: "User saved Succesfullly",
              addedData
            });
          });
        }
      });
    }
  });
};

exports.updateUser = function (req, res) {
  let request = req.body;

  {
    request.email == null || request.email === ""
      ? delete request.email
      : (request.email = request.email);
  }
  {
    request.Address == null || request.Address === ""
      ? delete request.Address
      : (request.Address = request.Address);
  }
  {
    request.phone == null || request.phone === ""
      ? delete request.phone
      : (request.phone = request.phone);
  }
  {
    request.userRoleId == null || request.userRoleId === ""
      ? delete request.userRoleId
      : (request.userRoleId = request.userRoleId);
  }

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: request,
    },
    (err, updateUser) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        updateUser
      });
    }
  );
};

exports.deleteUser = function (req, res) {
  User.findByIdAndRemove(req.params.id).exec((err, deleteUser) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deleteUser,
    });
  });
};
