const express = require("express");
const { fetchallProducts, createProduct, fetchProductById, updateProduct } = require("../controller/Product");
const router= express.Router();


router
.post('/', createProduct)
.get('/', fetchallProducts)
.get('/:id', fetchProductById)
.patch('/:id', updateProduct);

exports.router = router;