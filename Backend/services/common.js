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

exports.invoiceTemplate = function (order) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Receipt</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  

    body {
      background-color:rgb(163, 122, 73);
      margin: 0;
      padding: 0;
      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    }

    .email-container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 36px;
      border-top: 3px solid #d4dadf;
    }

    h1 {
      font-size: 28px;
      margin: 0 0 20px 0;
      font-weight: 700;
    }

    .order-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .order-table th,
    .order-table td {
      text-align: left;
      padding: 12px;
      font-size: 16px;
      border-bottom: 1px dashed #ccc;
    }

    .order-table th {
      background-color: #c8baaa;
      font-weight: 700;
    }

    .total-row {
      font-weight: 700;
    }

    .address {
      margin-top: 20px;
    }

    .address p {
      margin: 4px 0;
    }

    a {
      color: #1a82e2;
      text-decoration: none;
    }

    .logo {
      text-align: center;
      margin-bottom: 24px;
    }

    .logo img {
      width: 48px;
    }
  </style>
</head>
<body>
  <div class="logo">
    <img src="Backend\services\cmpLogoRed.png" alt="Logo">
  </div>

  <div class="email-container">
    <h1>Thank you for your order!</h1>
    <p>Here is a summary of your recent order. If you have any questions or concerns about your order, please <a href="mailto:coderdost@gmail.com">contact us</a>.</p>

    <table class="order-table">
      <tr>
        <th>Order #</th>
        <th colspan="2">${order?._id}</th>
      </tr>

      ${order?.products?.map(product => `
        <tr>
          <td>${product?.product?.title || 'Product'}</td>
          <td>${product?.quantity}</td>
          <td>₹${(
            (product?.product?.price *
            (1 - product?.product?.discountPercentage / 100))*product?.quantity
          ).toFixed(2)}</td>
        </tr>
      `).join("")}

      <tr class="total-row">
        <td>Total</td>
        <td>${order?.totalItems}</td>
        <td>₹${order?.totalAmount.toFixed(2)}</td>
      </tr>
    </table>

    <div class="address">
      <strong>Delivery Address</strong>
      <p>${order?.selectedAddress?.name}</p>
      <p>${order?.selectedAddress?.streetName}</p>
      <p>${order?.selectedAddress?.City}, ${order?.selectedAddress?.state}, ${order?.selectedAddress?.pinCode}</p>
      <p>Phone: ${order?.selectedAddress?.mobile}</p>
    </div>
  </div>
</body>
</html>
`;
};
