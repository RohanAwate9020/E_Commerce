const express = require("express");
const { fetchallProducts, createProduct } = require("../controller/Product");
const router= express.Router();


router
.get('/', fetchallProducts)
.post('/', createProduct);

exports.router = router;