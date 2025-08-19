const express = require("express");

const {   fetchUserById, updateUser, fetchUsers, emailAdminToUser } = require("../controller/User");
const router= express.Router();


router
.get('/own', fetchUserById)
.get('/users', fetchUsers)
.post('/email', emailAdminToUser)
.patch('/update', updateUser)



exports.router = router;