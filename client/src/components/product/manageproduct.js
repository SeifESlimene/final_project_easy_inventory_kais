import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

function GProduct() {
  return (
    <div>
      <h2>manage Product</h2>
      <hr />
      <div className="buttons-container">
        <Link className="main-buttons" to="/products/addProduct">
          <button>Add a product</button>
        </Link>
        <Link className="main-buttons" to="/products/allProduct">
          Get all products
        </Link>
      </div>
    </div>
  );
}

export default GProduct;
