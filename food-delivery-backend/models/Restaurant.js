const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  id: String,
  name: String,
  cloudinaryImageId: String,
  locality: String,
  areaName: String,
  costForTwo: String,
  cuisines: [String],
  avgRating: Number,
  sla: {
    deliveryTime: Number,
    slaString: String
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);