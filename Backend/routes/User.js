const express = require("express");

const {   fetchUserById, updateUser } = require("../controller/User");
const router= express.Router();


router
.get('/own', fetchUserById)
.patch('/update', updateUser)



exports.router = router;