import "./styles.css";

import { hot } from "react-hot-loader/root";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import { getProductAction } from "../../actions/productactions";
import { updateProductAction, incrementQuantity, decrementQuantity } from "../../actions/productactions";
import { postInvoiceAction } from "../../actions/invoiceactions";

import SingleInvoice from "./singleinvoice";

function SalesPage() {

  const products = useSelector((state) => state.productReducer.product);
  const quantity = useSelector((state) => state.productReducer.quantity);
  const idUsers = useSelector((state) => state.authReducer.user._id);
  const dispatch = useDispatch();

  const [salesList, setSalesList] = useState([]);
  const [isInvoiceShow, setIsInvoiceShow] = useState(false);

  const showInvoice = (e) => {
    setIsInvoiceShow(true);
  };

  const handlePostInvoice = (e) => {
    let sales = {
      idProducts: salesList.map((el) => el._id),
      idUsers: [idUsers],
      totalPrice: totalPrice,
    };
    e.preventDefault();
    dispatch(postInvoiceAction(sales));
  };

  let totalPrice = products.reduce((previousTotalPrice, currentTotalPrice) => {
    // debugger
    return previousTotalPrice + currentTotalPrice.price * currentTotalPrice.quantity }
    , 0
  );

  useEffect(() => {
    dispatch(getProductAction());
  }, []);

  const closeInvoiceModal = () => {
    setIsInvoiceShow(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const customStyles = {
    content: {
      width: "60rem",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      {isInvoiceShow === true ? (
        <Modal
          ariaHideApp={false}
          isOpen={isInvoiceShow}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Invoice</span>
            <div className="close-modal" onClick={closeInvoiceModal}>
              <i className="fal fa-times close-modal-icon"></i>
            </div>
          </div>

          <div className="modal-body">
            <div className="compartiment">
              {isInvoiceShow && (
                <SingleInvoice totalPrice={totalPrice} salesList={salesList} />
              )}
            </div>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeInvoiceModal}>
              {" "}
              Close modal{" "}
            </button>
            <button className="btn btn-modal" onClick={handlePostInvoice}>
              Send Invoice
            </button>
          </div>
        </Modal>
      ) : null}
      <div className="table-responsive">
        <div className="Invoice-input">
          <table>
            <thead>
              <tr id="header">
                <th>Product Name</th>
                <th>Price</th>
                <th>In stock</th>
                <th>State</th>
                <th>Action</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, productIndex) => {
                  return (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.number}</td>
                      <td>
                        {product.state === "In Stock" ? (
                          <div className="in_stock"></div>
                        ) : (
                          <div className="not_in_stock"></div>
                        )}
                      </td>
                      <td>
                        <i
                          className="fal fa-minus-circle removeIcon"
                          onClick={() => dispatch(decrementQuantity(product._id))}
                        ></i>
                        <i
                          className="fal fa-plus-circle addIcon"
                          onClick={() => dispatch(incrementQuantity(product._id))}
                        ></i>
                      </td>
                      <td>{product.quantity}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div style={{ marginTop: "2rem", textAlign: "end" }}>
            <h3 style={{ fontSize: "2rem" }}>{totalPrice}$</h3>
          </div>
          <button
            className="btn btn-modal"
            style={{ marginTop: "2rem", float: "right" }}
            onClick={showInvoice}
          >
            Get Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default hot(SalesPage);
