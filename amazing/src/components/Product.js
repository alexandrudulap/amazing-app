import React from "react";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props;
  return (
    <article key={product.id} className="card">
      <a href={`/product/${product.id}`}>
        <img
          className="medium"
          src={product.image}
          alt={product.name}
        />
      </a>
      <div className="card-body">
        <a href={`/product/${product.id}`}>
          <h2 className="card-title">{product.name}</h2>
        </a>
        <div className="rating">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
        <div className="price">${product.price}</div>
      </div>
    </article>
  );
};

export default Product;
