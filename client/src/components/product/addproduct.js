import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../actions/productactions";

function AddProduct({history}) {
  const [product, setProduct] = useState({
    number: "",
    name: "",
    buyingPrice: "",
    price: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const auth = useSelector((state) => state.auth);

  const toAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProductAction(product));
    setProduct({
      number: "",
      name: "",
      buyingPrice: "",
      price: "",
      description: "",
    })
  };
  return (
    <div>
      <h2>Add product</h2>
      <button onClick={() => history.goBack()} >Back</button>

      <form >
        <div>
          <label>Number</label>
          <input type="text" name="number" value={product.number} onChange={handleChange} />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name"  onChange={handleChange} />
        </div>
        <div>
          <label>Buying Price</label>
          <input type="text" name="buyingPrice" value={product.buyingPrice}  onChange={handleChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="text" name="price" onChange={handleChange} />
        </div>

        <div>
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <button onClick={toAddProduct}>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
