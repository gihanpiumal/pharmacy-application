const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  Description: { type: String, required: true },
});

module.exports = mongoose.model("Users", categorySchema);
