import React, { Fragment } from "react";

const SingleInvoice = ({ totalPrice, salesList }) => {
  return (
    <div>
      {salesList &&
        salesList.map((product) => (
          <Fragment key={product._id}>
            <p>
              {" "}
              <label htmlFor="">Product:</label> {product.name}
            </p>
            <ul>
              <li>
                {" "}
                <label htmlFor="">Quantity:</label> {product.qte}
              </li>
              <li>
                {" "}
                <label htmlFor="">Unit Price:</label> {product.price}
              </li>
              <li>
                {" "}
                <label htmlFor="">Total:</label> {product.subTotal}
              </li>
            </ul>
          </Fragment>
        ))}
      <p style={{ marginTop: "1rem" }}>
        {" "}
        <label htmlFor="">Prix total:</label> {totalPrice}
      </p>
    </div>
  );
};

export default SingleInvoice;
