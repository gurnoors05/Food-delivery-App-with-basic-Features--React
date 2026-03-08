const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {

    const userId = req.user.id;

    const { menu_item_id, name, price, category, imageId, description } = req.body;

    if (!menu_item_id) {
      return res.status(400).json({ message: "Invalid item" });
    }

    let cart = await Cart.findOne({ userId });

    // create cart if not exists
    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    // check existing item
    const existingItem = cart.items.find(
      item => String(item.menu_item_id) === String(menu_item_id)
    );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.items.push({
        menu_item_id,
        name,
        price,
        category,
        imageId,
        description,
        quantity: 1
      });

    }

    await cart.save();

    res.json({
      message: "Item added to cart",
      cart
    });

  } catch (error) {

    console.error("ADD CART ERROR:", error);

    res.status(500).json({
      message: "Error adding item to cart"
    });

  }
};


// GET CART
const getCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json([]);
    }

    res.json(cart.items);

  } catch (error) {

    console.error("GET CART ERROR:", error);

    res.status(500).json({
      message: "Error fetching cart"
    });

  }

};


// CLEAR CART
const clearCart = async (req, res) => {

  try {

    const userId = req.user.id;

    await Cart.updateOne(
      { userId },
      { $set: { items: [] } }
    );

    res.json({ message: "Cart cleared" });

  } catch (error) {

    console.error("CLEAR CART ERROR:", error);

    res.status(500).json({
      message: "Error clearing cart"
    });

  }

};

const increaseQuantity = async (req, res) => {
  try {

    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      item => String(item.menu_item_id) === String(itemId)
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity += 1;

    await cart.save();

    res.json(cart.items);

  } catch (error) {

    console.error("INCREASE ERROR:", error);

    res.status(500).json({
      message: "Error increasing quantity"
    });

  }
};
const decreaseQuantity = async (req, res) => {
  try {

    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      item => String(item.menu_item_id) === String(itemId)
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item.quantity > 1) {

      item.quantity -= 1;

    } else {

      cart.items = cart.items.filter(
        item => String(item.menu_item_id) !== String(itemId)
      );

    }

    await cart.save();

    res.json(cart.items);

  } catch (error) {

    console.error("DECREASE ERROR:", error);

    res.status(500).json({
      message: "Error decreasing quantity"
    });

  }
};
module.exports = {
  addToCart,
  getCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
};