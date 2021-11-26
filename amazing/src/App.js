import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import SignInScreen from "./Screens/SignInScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";

const getLocalStorageCart = () => {
  let list = localStorage.getItem("cart");
  if (list) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};
const getLocalStorageAddress = () => {
  let addressObj = localStorage.getItem("address");
  if (addressObj) {
    return JSON.parse(localStorage.getItem("address"));
  } else {
    return {};
  }
};

function App() {
  const [cart, setCart] = useState(getLocalStorageCart());
  const [shippingAddress, setShippingAddress] = useState(
    getLocalStorageAddress()
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("address", JSON.stringify(shippingAddress));
  }, [cart, shippingAddress]);

  return (
    <BrowserRouter>
      <div className="flex-container">
        <header className="row">
          <div>
            <a href="/" className="logo">
              amazing
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route
              path="/product/:id"
              element={<ProductScreen cart={cart} setCart={setCart} />}
            />
            <Route
              path="/cart"
              element={<CartScreen cart={cart} setCart={setCart} />}
            />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/shipping"
              element={
                <ShippingAddressScreen
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                />
              }
            />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route
              path="/placeorder"
              element={
                <PlaceOrderScreen
                  cart={cart}
                  shippingAddress={shippingAddress}
                />
              }
            />
          </Routes>
          
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
