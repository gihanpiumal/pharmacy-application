const mongoose = require("mongoose");

const purchaseStoreSchema = new mongoose.Schema({
  purchaseNo: { type: String, unique: true, required: true },
  categoryId: { type: mongoose.Schema.ObjectId, required: true },
  medicineId: { type: mongoose.Schema.ObjectId, required: true },
  date: { type: Date, default: Date.now, required: true },
  userId: { type: String, required: true },
  addToStore: { type: Boolean, default: false, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("PurchaseStore", purchaseStoreSchema);
