import React, { useState } from "react";
import FormContainer from "../components/FormContainer.js";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import Meta from "../components/Meta.js";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <Meta title="Payment Method"></Meta>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>PAYMENT METHOD</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="payment">
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            CONTINUE
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
