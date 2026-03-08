const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} = require("../controllers/cartController");

const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCart);

router.post("/add", verifyToken, addToCart);

router.delete("/clear", verifyToken, clearCart);

// NEW ROUTES
router.put("/increase/:itemId", verifyToken, increaseQuantity);

router.put("/decrease/:itemId", verifyToken, decreaseQuantity);

module.exports = router;