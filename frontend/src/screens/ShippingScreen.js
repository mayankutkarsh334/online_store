import React, { useState } from "react";
import FormContainer from "../components/FormContainer.js";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import Meta from "../components/Meta.js";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <Meta title="Shipping Address"></Meta>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>SHIPPING</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            CONTINUE
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
