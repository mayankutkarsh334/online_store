import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer.js";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions.js";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import Meta from "../components/Meta.js";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Passwords do not match");
    else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <Meta title="Register"></Meta>
      <FormContainer>
        <h3>Register</h3>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" type="submit" variant="primary">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Existing Customer?{" "}
            <Link to={redirect ? `/login?=${redirect}` : "/login"}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
      \
    </>
  );
};

export default RegisterScreen;
