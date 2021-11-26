import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const PlaceOrderScreen = (props) => {
  const navigate = useNavigate();
  const { cart, shippingAddress } = props;

  const toPrice = (num) => Number(num.toFixed(2));

  let prices = {};
  prices.itemsPrice = toPrice(cart.reduce((a, c) => a + c.qty * c.price, 0));
  prices.shippingPrice = cart.items > 100 ? toPrice(0) : toPrice(10);
  prices.taxPrice = toPrice(0.15 * prices.itemsPrice);
  prices.totalPrice =
    prices.itemsPrice + prices.shippingPrice + prices.taxPrice;

  const placeOrderHandler = () => {
    navigate("order");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h1 className="bold">Shipping</h1>
                <p>
                  <strong>Name: </strong> {shippingAddress.fullName} <br />
                  <strong>Address: </strong> {shippingAddress.country},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1 className="bold">Payment</h1>
                <p>
                  <strong>Method: </strong> PayPal
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.map((item) => (
                    <li>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h1 className="bold">Order Summary</h1>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${prices.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${prices.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${prices.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${prices.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  disabled={cart.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
