import axios from "axios";
import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer.js";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productsActions.js";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants.js";
import Meta from "../components/Meta.js";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/productList");
    }
    if (!product || !product.name || product._id !== productId) {
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setImage(product.image);
      setPrice(product.price);
    }
  }, [dispatch, product, productId, history, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brand,
        category,
        description,
        countInStock,
        image,
        price,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error.message);
      setUploading(false);
    }
  };

  return (
    <>
      <Meta title="Edit your Product"></Meta>
      <FormContainer>
        <Link to="/admin/productList">GO BACK</Link>
        <h3>Edit product</h3>
        {loadingUpdate && <Loader></Loader>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Enter the Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter the Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Enter the count"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
              <Form.File
                id="image-file"
                label="Choose File"
                name="image"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
