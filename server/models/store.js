const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.ObjectId, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Store", storeSchema);
