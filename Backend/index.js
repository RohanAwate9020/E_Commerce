const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product =require("./controller/Product.js")
const productsRouter =require("./routes/Products.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const cors = require("cors");

// // Use this config to expose custom headers like X-Total-Count
// app.use(cors({
//   exposedHeaders: ["X-Total-Count"]
// }));


app.use('/products', productsRouter.router);

require('dotenv').config();
const DBPassword= process.env.DB_Password;
connectDB().then(()=>{
  console.log("Connected to MongoDB successfully");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
async function connectDB() {
  await mongoose.connect(`mongodb+srv://Rohan:${DBPassword}@ecommerce.w4ovj5y.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce`);
}

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})
