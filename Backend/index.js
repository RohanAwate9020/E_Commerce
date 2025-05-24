const express = require('express');
const app = express();
const mongoose = require('mongoose');


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
    console.log("Server is running on port 3000");
})

app.get('/', (req, res) => {    
    res.send('Hello World!');
});