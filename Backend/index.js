const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productsRouter =require("./routes/Products.js")
const BrandsRouter =require("./routes/Brands.js")
const categoryRouter =require("./routes/Category.js")
const userRouter =require("./routes/User.js")
const authRouter =require("./routes/Auth.js")
const cartRouter =require("./routes/Cart.js")
const orderRouter =require("./routes/Order.js")
const adminRouter =require("./routes/Admin.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");

// Use this config to expose custom headers like X-Total-Count
app.use(cors({
  exposedHeaders: ["X-Total-Count"]
}));


app.use('/products', productsRouter.router);
app.use('/brands', BrandsRouter.router);
app.use('/category', categoryRouter.router);
app.use('/user', userRouter.router);
app.use('/auth', authRouter.router);
app.use('/cart', cartRouter.router);
app.use('/orders', orderRouter.router);
app.use('/admin', adminRouter.router);

require('dotenv').config();
const connectionString= process.env.DB_ConnectionString;
connectDB().then(()=>{
  console.log("Connected to MongoDB successfully");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
async function connectDB() {
  await mongoose.connect(`${connectionString}`);
}

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})
