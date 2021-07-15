import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { deleteProduct, listProducts } from "../actions/productsActions.js";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = (product) => {
    //create product
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>PRODUCTS</h1>
        </Col>
        <Col className="justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> CREATE PRODUCT
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader></Loader>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteProductHandler(product._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
