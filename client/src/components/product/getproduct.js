import "./product.css";

import { hot } from "react-hot-loader/root";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import {
  addProductAction,
  getProductAction,
  deleteProductAction,
  updateProductAction,
} from "../../actions/productactions";

import DeleteConfirmationDialog from "../../shared/DeleteConfirmationDialog";

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

function GetProduct() {
  const auth = useSelector((state) => state.authReducer);
  const product = useSelector((state) => state.productReducer.product);

  const dispatch = useDispatch();

  const [productId, setproductId] = useState(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productItem, setproductItem] = useState(null);
  const [productI, setProductI] = useState({
    number: "",
    name: "",
    buyingPrice: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getProductAction());
  }, []);

  const openModal = (idProd) => {
    setIsOpenModal(true);
    setproductId(idProd);
    setTimeout(() => {
      setproductItem(
        product.filter((thisProduct) => thisProduct._id === idProd)[0]
      );
    }, 300);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleChange = (e) => {
    if (
      e.target.name === "number" ||
      e.target.name === "buyingPrice" ||
      e.target.name === "price"
    ) {
      setproductItem({
        ...productItem,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setproductItem({ ...productItem, [e.target.name]: e.target.value });
    }
  };

  const updateProduct = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction(productId, {
        name: productItem.name,
        number: productItem.number,
        buyingPrice: productItem.buyingPrice,
        price: productItem.price,
        description: productItem.description,
      })
    );
    closeModal();
  };

  setTimeout(() => {}, 2000);

  const handleChangeAddProduct = (e) => {
    setProductI({ ...productI, [e.target.name]: e.target.value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    dispatch(addProductAction(productI));
    setProductI({
      number: "",
      name: "",
      buyingPrice: "",
      price: "",
      description: "",
    });

    closeAddProductModal();
  };
  const openAddProductModal = (e) => {
    setAddProductModal(true);
  };
  const closeAddProductModal = () => {
    setAddProductModal(false);
  };

  return (
    <div>
      {productItem !== null ? (
        <Modal
          ariaHideApp={false}
          isOpen={isOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Update Product</span>
            <div className="close-modal" onClick={closeModal}>
              <i className="fal fa-times close-modal-icon"></i>
            </div>
          </div>
          <div className="modal-body">
            <form>
              <div className="compartiment">
                <label>Number</label>
                <input
                  type="text"
                  name="number"
                  onChange={handleChange}
                  value={productItem.number}
                />
              </div>
              <div className="compartiment">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={productItem.name}
                />
              </div>
              <div className="compartiment">
                <label>Buying price</label>
                <input
                  type="text"
                  name="buyingPrice"
                  onChange={handleChange}
                  value={productItem.buyingPrice}
                />
              </div>
              <div className="compartiment">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={productItem.price}
                />
              </div>

              <div className="compartiment">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={productItem.description}
                />
              </div>
            </form>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeModal}>
              {" "}
              Close modal{" "}
            </button>
            <button className="btn btn-modal" onClick={updateProduct}>
              Save
            </button>
          </div>
        </Modal>
      ) : null}
      {addProductModal === true ? (
        <Modal
          ariaHideApp={false}
          isOpen={addProductModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Add a product</span>
            <div className="close-modal" onClick={closeAddProductModal}>
              <i className="fal fa-times close-modal-icon"></i>
            </div>
          </div>

          <div className="modal-body">
            <form>
              <div className="compartiment">
                <label>Number</label>
                <input
                  type="text"
                  name="number"
                  onChange={handleChangeAddProduct}
                  value={productI.number}
                />
              </div>
              <div className="compartiment">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeAddProduct}
                  value={productI.name}
                />
              </div>
              <div className="compartiment">
                <label>Buying price</label>
                <input
                  type="text"
                  name="buyingPrice"
                  onChange={handleChangeAddProduct}
                  value={productI.buyingPrice}
                />
              </div>
              <div className="compartiment">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChangeAddProduct}
                  value={productI.price}
                />
              </div>

              <div className="compartiment">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChangeAddProduct}
                  value={productI.description}
                />
              </div>
            </form>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeAddProductModal}>
              Close modal
            </button>
            <button className="btn btn-modal" onClick={addProduct}>
              Add Product
            </button>
          </div>
        </Modal>
      ) : null}
      <p className="countUsers">Products</p>
      <div className="table-responsive">
        <button
          style={{ float: "right" }}
          className="add btn"
          onClick={openAddProductModal}
        >
          {" "}
          Add product
        </button>
        <table>
          <thead>
            <tr id="header">
              <th>N°</th>
              <th>Name</th>
              <th>In stock</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td> {index + 1} </td>
                    <td>{product.name}</td>
                    <td> {product.number} </td>
                    <td> {product.description} </td>
                    <td> {product.price} </td>

                    <td>
                      {auth?.user?.role !== "Cashier" && (
                        <i
                          onClick={() => openModal(product._id)}
                          className="fal fa-pen edit"
                        ></i>
                      )}
                      <i
                        onClick={() =>
                          dispatch(deleteProductAction(product._id))
                        }
                        className="fal fa-trash-alt remove"
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationDialog />
    </div>
  );
}

export default hot(GetProduct);
