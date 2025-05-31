const mongoose = require('mongoose');
const model = require('../model/Order');
const Order = model.Order;

exports.createNewOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    // const result = await doc.populate("product");
    res.status(201).json( doc );
  } catch (err) {
    res.status(500).json({
      message: "Error adding product in cart",
      error: err.message,
    });
  }
};

exports.fetchOrdersByUserId = async (req, res) => {
  const {userId} = req.query;
  try {
    const order = await Order.find({ user: userId }).exec();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching cart items",
      error: err.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Order.findByIdAndDelete(id).exec();
    res.status(201).json( result );
  } catch (err) {
    res.status(500).json({
      message: "Error removing product in cart",
      error: err.message,
    });
  }
};


exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const doc = await Order.findByIdAndUpdate(
      orderId,
      req.body,
      { new: true }
    ).exec();
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    });
  }
};