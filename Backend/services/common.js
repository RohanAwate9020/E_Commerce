const passport = require("passport");
const nodemailer = require("nodemailer");
const {User} = require("../model/User.js");

exports.isAuth = () => {
  return passport.authenticate("jwt", { session: false });
};

exports.sanitizeUser = (user) => {
  return {
    id: user.id,
    role: user.role,
  };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

// setup email transporter using nodemailer (example)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.Email_Service_Username,
    pass: process.env.Email_Service_Password,
  },
});

exports.sendEmail = async ({to, subject, text,html}) => {

    const info = await transporter.sendMail({
      from: "Quickcart  <test@gmail.com>",
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    return info;
  
};
