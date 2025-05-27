const mongoose = require("mongoose");
const model = require("../model/Category");
const Category = model.Category;

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching brands",
      error: err.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const categorySaved = await category.save();
    res.status(201).json({
      message: "Category created successfully",
      category: categorySaved,
    });
  } catch (err) {
    res.status(500).json({
      message: "error creating category",
      error: err,
    });
  }
};
