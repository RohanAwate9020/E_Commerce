const express = require("express");
const { createUser, loginUser, checkAuth, resetPasswordRequest, resetPassword, logout } = require("../controller/Auth");
const router= express.Router();
const passport = require("passport");

router
.post('/signup', createUser)
.post('/login',passport.authenticate('local'), loginUser)
.post('/reset-password-request',resetPasswordRequest)
.post('/reset-password',resetPassword)
.get('/logout',logout)
.get('/check',passport.authenticate('jwt'),checkAuth);


exports.router = router;