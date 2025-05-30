const mongoose = require("mongoose");
const model = require("../model/Brand.js");
const Brand = model.Brand;

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching brands",
      error: err.message,
    });
  }
};


exports.createBrand = async (req, res) => {
    const brand = new Brand(req.body);
 try {
const savedBrand = await brand.save();
    res.status(201).json({
        message: "Brand created successfully",
        brand: savedBrand,
    });
 }catch(err){
    res.status(500).json({
      message: "Error creating brand",
      error: err.message,
    });
  }
 };
