const express = require("express");
const { createNewOrder, fetchOrdersByUserId, updateOrder, deleteOrder } = require("../controller/Order");
const router= express.Router();

router
.post('/', createNewOrder)
.get('/', fetchOrdersByUserId)
.patch('/:id', updateOrder)
.delete('/:id', deleteOrder);


exports.router = router;