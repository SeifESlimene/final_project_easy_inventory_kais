import React, {
  // useState,
  // useEffect
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-modal";

import {
  // addInvoiceAction,
  // getInvoicesAction,
  deleteInvoiceAction,
} from "../../actions/invoiceactions";

function getInvoice() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const invoices = useSelector((state) => state.invoiceReducer.invoice);

  // const [isAddInvoiceModal, setIsAddInvoiceModal] = useState(false);
  // const [invoiceItem, setInvoiceItem] = useState({
  //   number: "",
  //   totalPrice: "",
  //   discount: "",
  //   vat: "",
  // });

  // useEffect(() => {
  //   dispatch(getInvoicesAction());
  // }, []);

  // const openAddInvoiceModal = (e) => {
  //   setIsAddInvoiceModal(true);
  // };

  // const closeAddInvoiceModal = () => {
  //   setIsAddInvoiceModal(false);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const customStyles = {
  //   content: {
  //     width: "60rem",
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //   },
  // };

  // const handleChange = (e) => {
  //   setInvoiceItem({ ...invoiceItem, [e.target.name]: e.target.value });
  // };

  // const addInvoiceItem = (e) => {
  //   e.preventDefault();
  //   dispatch(addInvoiceAction(invoiceItem));
  //   closeAddInvoiceModal();
  // };

  return (
    <div>
      <p className="countUsers">Invoices</p>

      {/* {isAddInvoiceModal === true ? (
        <Modal
          isOpen={isAddInvoiceModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Add Invoice</span>
            <div className="close-modal" onClick={closeAddInvoiceModal}>
              <i className="fal fa-times close-modal-icon"></i>
            </div>
          </div>

          <div className="modal-body">
            <form>
              <div className="compartiment">
                <label>Number</label>
                <input type="text" name="number" onChange={handleChange} />
              </div>

              <div className="compartiment">
                <label>Total Price</label>
                <input type="text" name="totalPrice" onChange={handleChange} />
              </div>
              <div className="compartiment">
                <label>Discount</label>
                <input type="text" name="discount" onChange={handleChange} />
              </div>
              <div className="compartiment">
                <label>Vat</label>
                <input type="text" name="vat" onChange={handleChange} />
              </div>
            </form>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeAddInvoiceModal}>
              {" "}
              Close modal{" "}
            </button>
            <button className="btn btn-modal" onClick={addInvoiceItem}>
              Add
            </button>
          </div>
        </Modal>
      ) : null} */}

      <div className="table-responsive">

        {/* <button
          style={{ float: "right" }}
          className="add btn"
          onClick={openAddInvoiceModal}
        >
          Add Invoice
        </button> */}

        <table>
          <thead>
            <tr id="header">
              <th>N°</th>
              <th>Total Price</th>
              <th>discount</th>
              <th>vat</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.map((invoice, index) => (
                <tr>
                  <td> {index + 1} </td>
                  <td> {invoice.totalPrice} </td>
                  <td> {invoice.discount} </td>
                  <td> {invoice.vat}</td>
                  <td> {invoice.number} </td>
                  <td></td>
                  <td>
                    {auth?.user?.role !== "Cashier" && (
                      <i className="fal fa-pen edit"></i>
                    )}
                    <i
                      onClick={() => dispatch(deleteInvoiceAction(invoice._id))}
                      className="fal fa-trash-alt remove"
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default getInvoice;
