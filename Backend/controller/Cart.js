const mongoose = require("mongoose");
const model = require("../model/Cart");
const Cart = model.Cart;

exports.fetchCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cartItems = await Cart.find({ userId: userId })
      .populate("user")
      .populate("product")
      .exec();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching cart items",
      error: err.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json( result );
  } catch (err) {
    res.status(500).json({
      message: "Error adding product in cart",
      error: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await Cart.findByIdAndUpdate(
      cartId,
      { quantity: req.body.quantity },
      { new: true }
    ).exec();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    });
  }
};

exports.deleteFromCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const result = await Cart.findByIdAndDelete(cartId).exec();
    res.status(201).json( result );
  } catch (err) {
    res.status(500).json({
      message: "Error removing product in cart",
      error: err.message,
    });
  }
};