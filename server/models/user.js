const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  Address: { type: String, required: true },
  phone: { type: Number, required: true },
  DOB: { type: Date, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  userRoleId: { type: mongoose.Schema.ObjectId, required: true },
});

module.exports = mongoose.model("User", userRoleSchema);
