const User = require("../models/user");
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
      allUserRoles: { user },
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

          newUser.save((err) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
            return res.status(200).json({
              success: "User saved Succesfullly",
            });
          });
        }
      });
    }
  });
};

exports.updateUser = function (req, res) {
  User.findByIdAndUpdate(
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
