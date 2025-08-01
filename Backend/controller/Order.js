const mongoose = require("mongoose");
const model = require("../model/Order");
const { User } = require("../model/User");
const { sendEmail, invoiceTemplate } = require("../services/common");
const { Product } = require("../model/Product");
const Order = model.Order;


exports.createNewOrder = async (req, res) => {
  const order = new Order(req.body); 
  for (let item of order.products){
    await Product.findByIdAndUpdate(item.product.id, {$inc: { stock: -1 * item.quantity }})
  }
  try {
    const doc = await order.save();
    const user = await User.findById(order.user)
    sendEmail({
      to: user.email,
      subject: "Order Confirmation",
      text: `Order has been successfully placed.\n\nThank you for shopping with us!`,
      html: invoiceTemplate(order),
    })

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({
      message: "Error adding product in cart",
      error: err.message,
    });
  }
};

exports.fetchOrdersByUserId = async (req, res) => {
  const userId = req.query.user;
  console.log("User ID", userId);
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
    res.status(201).json(result);
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
    const doc = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    }).exec();
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    });
  }
};

exports.fetchOrdersAdmin = async (req, res) => {
  let query = Order.find({ deleted: { $ne: true } }); // Assuming you want to exclude deleted products
  let totalOrdersQuery = Order.find({ deleted: { $ne: true } }); // Same for total count

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  try {
    const totalDocs = await totalOrdersQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
    }

    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
