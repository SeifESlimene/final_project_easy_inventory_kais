import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../actions/productactions";
import { useLocation } from "react-router-dom";

function UpdateProduct({ history }) {
  let location = useLocation();

  let pathnamePortions = location.pathname.split("/");
  let productId = pathnamePortions[pathnamePortions.length - 1];
  const products = useSelector((state) => state.productReducer.product);

  let product = products.filter(
    (thisProduct) => thisProduct._id === productId
  )[0];

  const [prod, setProd] = useState({
    name: product?.name,
    number: product?.number,
    buyingPrice: product?.buyingPrice,
    price: product?.price,
    description: product?.description,
  });

  const dispatch = useDispatch();

  const updateProduct = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction(productId, {
        name: prod.name,
        number: prod.number,
        buyingPrice: prod.buyingPrice,
        price: prod.price,
        description: prod.description,
      })
    );
    history.push("/products/allProduct");
  };

  const handleChange = (e) => {
    if (
      e.target.name === "number" ||
      e.target.name === "buyingPrice" ||
      e.target.name === "price"
    ) {
      setProd({ ...prod, [e.target.name]: parseInt(e.target.value) });
    } else {
      setProd({ ...prod, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>

      <form onSubmit={updateProduct}>
        <div>
          <label>Number</label>
          <input
            type="text"
            name="number"
            onChange={handleChange}
            value={prod.number}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={prod.name}
          />
        </div>
        <div>
          <label>Buying Price</label>
          <input
            type="text"
            name="buyingPrice"
            onChange={handleChange}
            value={prod.buyingPrice}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            onChange={handleChange}
            value={prod.price}
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={prod.description}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default hot(UpdateProduct);
