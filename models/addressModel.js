const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  AddressLine1: { type: String, required: true },
  AddressLine2: { type: String, required: false },
  Street: { type: String, required: false },
  City: { type: String, required: true },
  State: { type: String, required: true },
  PinCode: { type: String, required: true },
  userId: { type: String, required: true }
});

const Address = mongoose.model("adddress", addressSchema);

module.exports = { Address };