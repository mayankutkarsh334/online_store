import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message.js";
import Meta from "../components/Meta";

const CartScreen = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Meta title="Cart" />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Cart is Empty <Link to="/">GO BACK</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} fluid rounded></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(event) =>
                          dispatch(
                            addToCart(item.product, Number(event.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  SUBTOTAL (
                  {cartItems.reduce((acc, cur) => {
                    return acc + cur.qty;
                  }, 0)}
                  ) ITEMS
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                $
                {cartItems
                  .reduce((acc, cur) => {
                    return acc + cur.qty * cur.price;
                  }, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  PROCEED FOR CHECKOUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
