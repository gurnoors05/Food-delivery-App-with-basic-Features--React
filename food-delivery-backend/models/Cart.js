const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

 items: [
{
  menu_item_id: Number,
  name: String,
  price: Number,
  category: String,
  imageId: String,
  description: String,
  quantity: {
    type: Number,
    default: 1
  }
}
]
});
module.exports = mongoose.model("Cart", cartSchema);