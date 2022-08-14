const mongoose = require("mongoose")

const medicinesSchema = new mongoose.Schema({
    categoryId: {type: mongoose.Schema.ObjectId, required: true },
    name:{type:String, required : true},
    description:{type:String, required : true},
    doctrorApproval:{type:Boolean, required : true},
    price:{type:Number, required : true},
})

module.exports = mongoose.model("Medicines", medicinesSchema);