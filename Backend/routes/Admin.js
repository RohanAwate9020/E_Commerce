const express = require("express");

const { fetchOrdersAdmin } = require("../controller/Order");
const router= express.Router();


router
.get('/orders', fetchOrdersAdmin);



exports.router = router;