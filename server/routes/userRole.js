const UserRole = require("../models/userRole");
const mongoose = require("mongoose");

exports.getUserRole = async function (req, res) {
  let request = req.body;

  condition = {
    $and: [
      request.roleName === ""
        ? {}
        : {
            roleName: request.roleName,
          },
    ],
  };

  let userRole = await UserRole.aggregate([{ $match: condition }]);

  if (userRole) {
    return res.status(200).json({
      success: true,
      allUserRoles: { userRole },
    });
  }
  return res.status(400).json({
    error: err,
  });
};

exports.addUserRole = function (req, res) {
  let newUserRole = UserRole(req.body);

  newUserRole.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "User Role saved Succesfullly",
    });
  });
};

exports.updateUserRole = function (req, res) {
  UserRole.findByIdAndUpdate(
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

exports.deleteUserRole = function (req, res) {
  UserRole.findByIdAndRemove(req.params.id).exec((err, deleteUserRole) => {
    if (err) {
      return res.status(400).json({ message: "Not deleted", err });
    }
    return res.json({
      message: "Delete Successfully",
      deleteUserRole,
    });
  });
};
