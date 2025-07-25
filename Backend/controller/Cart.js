const mongoose = require("mongoose");
const model = require("../model/Cart");
const Cart = model.Cart;

exports.fetchCartByUserId = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id })
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
  const { id } = req.user;
  const cart = new Cart({ ...req.body, user: id });
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error adding product in cart",
      error: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { id, ...updateFields } = req.body; // destructure id, rest goes to updateFields

  console.log("Updating cart item", id, updateFields);
  try {
    const updateField = req.body;
    const cart = await Cart.findByIdAndUpdate(
      cartId,
      // {"quantity":req.body.quantity},
      updateField,
      { new: true }
    )
      .populate("product")
      .exec();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
};
// exports.updateCart = async (req, res) => {
//   const cartId = req.params.id;
//   console.log("Update cart item", req.body);
//   try {
//     const cart = await Cart.findByIdAndUpdate(
//       cartId,
//        req.body ,
//       { new: true }
//     ).exec();
//     console.log("Updated cart item", cart);
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({
//       message: "Error fetching product",
//       error: err,
//     });
//   }
// };

exports.deleteFromCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const result = await Cart.findByIdAndDelete(cartId).exec();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error removing product in cart",
      error: err.message,
    });
  }
};
