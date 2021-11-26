import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const CartScreen = (props) => {
  const navigate = useNavigate();
  const { cart, setCart } = props;

  const removeFromCartHandler = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCartHandler = () => {
    setCart([]);
  };

  const changeQtyHandler = (id, qty) => {
    const cartItem = cart.find((item) => item.id === id);
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return {
          id: cartItem.id,
          name: cartItem.name,
          category: cartItem.category,
          image: cartItem.image,
          price: cartItem.price,
          brand: cartItem.brand,
          rating: cartItem.rating,
          numReviews: cartItem.numReviews,
          description: cartItem.description,
          countInStock: cartItem.countInStock,
          qty: parseInt(qty),
        };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="row top container-my">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </div>
        ) : (
          <ul>
            {cart.map((item) => {
              return (
                <li key={item.id}>
                  <div className="row">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        className="qtyChangeSelect"
                        value={item.qty}
                        onChange={(e) =>
                          changeQtyHandler(item.id, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                      <button onClick={() => removeFromCartHandler(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {cart.length !== 0 ? (
          <div className="clear-cart-container">
            <button
              type="button"
              className="clear-cart-button"
              onClick={clearCartHandler}
            >
              Clear cart
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2 className="bold">
                Subtotal (
                {cart.reduce((accumulator, currentItem) => {
                  return accumulator + currentItem.qty;
                }, 0)}{" "}
                items) : $
                {cart.reduce((accumulator, currentItem) => {
                  return accumulator + currentItem.price * currentItem.qty;
                }, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cart.length === 0}
              >
                Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
