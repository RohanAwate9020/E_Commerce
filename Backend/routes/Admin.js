const express = require("express");

const { fetchOrdersAdmin } = require("../controller/Order");
const { fetchallProductsAdmin } = require("../controller/Product");
const router= express.Router();


router
.get('/orders', fetchOrdersAdmin)
.get('/products', fetchallProductsAdmin);



exports.router = router;