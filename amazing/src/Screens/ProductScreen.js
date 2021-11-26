import React, { useState } from "react";
import data from "../data";
import { useParams } from "react-router";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const ProductScreen = (props) => {
  const { cart, setCart } = props;
  let { id } = useParams();
  id = parseInt(id);
  const [qty, setQty] = useState(1);
  const product = data.products.find((productById) => productById.id === id);

  // const history = useHistory();
  const addToCartHandler = () => {
    // props.history.push(`/cart/${id}?qty={qty}`);
    const cartItem = data.products.find((item) => item.id === id);

    if (!cart.find((item) => item.id === id)) {
      setCart([
        ...cart,
        {
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
        },
      ]);
    } else {
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
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <Link to="/">Back to results</Link>
      <div className="row top">
        <div className="col-2">
          <img src={product.image} alt={product.name} className="large" />
        </div>
        <div className="col-1">
          <ul className="full-info">
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price: ${product.price}</li>
            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="error">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Qty</div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      Add to cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
