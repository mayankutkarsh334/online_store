import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
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
