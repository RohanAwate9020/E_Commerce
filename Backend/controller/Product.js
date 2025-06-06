const model = require("../model/Product.js");
const Product = model.Product;

// exports.fetchallProducts = async (req, res) => {
//   let query = Product.find({});
//   let totalProductsQuery = Product.find({});

//   if (req.query.category) {
//     query = query.find({ category: req.query.category });
//     totalProductsQuery = totalProductsQuery.find({
//       category: req.query.category,
//     });
//   }
//   if (req.query.brand) {
//     query = query.find({ brand: req.query.brand });
//     totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
//   }
//   if (req.query._sort && req.query._order) {
//     query = query.sort({ [req.query._sort]: req.query._order });
//   }

//   const totalDocs = await totalProductsQuery.countDocuments().exec();

//   if (req.query._page && req.query._limit) {
//     const pageSize = req.query._limit;
//     const page = req.query._page;
//     query = query.skip((page - 1) * pageSize).limit(pageSize);
//   }

//   try {
//     const docs = await query.exec();
//     res.set("X-Total-Count",totalDocs);
//     res.status(200).json(docs);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.fetchallProducts = async (req, res) => {
  let query = Product.find({deleted: {$ne:true}}); // Assuming you want to exclude deleted products
  let totalProductsQuery = Product.find({deleted: {$ne:true}}); // Same for total count

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  try {
    const totalDocs = await totalProductsQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
    }

    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    console.log("Total Documents:", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchallProductsAdmin = async (req, res) => {
  let query = Product.find({}); // Assuming you want to exclude deleted products
  let totalProductsQuery = Product.find(); // Same for total count

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  try {
    const totalDocs = await totalProductsQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
    }

    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    console.log("Total Documents:", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully",
        product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating product",
        error: err,
      });
    });
};

exports.fetchProductById= async (req,res)=>{
  const productId =req.params.id;
  try{
    const product= await Product.findById(productId).exec();
    res.status(200).json(product);
  }catch(err){
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    })
  }
}
exports.updateProduct= async (req,res)=>{
  const productId =req.params.id;
  try{
    const product= await Product.findByIdAndUpdate(productId, req.body, { new: true }).exec();
    res.status(200).json(product);
  }catch(err){
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    })
  }
}