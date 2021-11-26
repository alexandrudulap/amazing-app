import React from "react";
import data from "../data";
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <section className="row center">
      {data.products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </section>
  );
};

export default HomeScreen;
