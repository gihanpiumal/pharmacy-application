const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  accessLevel: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("UserRole", userRoleSchema);
