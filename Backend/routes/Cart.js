const express = require("express");
const { fetchCartByUserId, addToCart, updateCart, deleteFromCart } = require("../controller/Cart");


const router= express.Router();

router
.get('/:id', fetchCartByUserId)
.patch('/:id', updateCart)
.delete('/:id', deleteFromCart)
.post('/', addToCart);


exports.router = router;