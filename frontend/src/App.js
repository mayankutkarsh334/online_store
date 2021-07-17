import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/orders/:id" component={OrderScreen} />
          <Route path="/admin/users/:id/edit" component={UserEditScreen} />
          <Route path="/admin/userList" component={UsersListScreen} />
          <Route
            path="/admin/productList"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productList/page/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/products/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/admin/orderList" component={OrderListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
