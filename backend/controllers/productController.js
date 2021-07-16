import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("rating:-1").limit(3);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404).json({ message: "not found" });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "not found" });
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    brand: "Sample brand",
    category: "Sample category",
    price: 0,
    numReviews: 0,
    user: req.user._id,
    image: "/images/sample.jpeg",
    description: "Sample description",
    rating: 0,
    countInStock: 0,
  });
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201);
    res.json(createdProduct);
  } else {
    res.status(404);
    throw new Error("No product found");
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const { name, brand, category, price, image, description, countInStock } =
      req.body;
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.image = image;
    product.description = description;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("No product found");
  }
});

export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Already reviewed");
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "New review added" });
  } else {
    res.status(404);
    throw new Error("No product found");
  }
});
