import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productsActions.js";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta title="Home" />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/">
          <Button className="btn btn-light">GO BACK</Button>
        </Link>
      )}
      <h3>Latest Products</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
};

export default HomeScreen;
