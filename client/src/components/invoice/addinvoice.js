import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoiceAction } from "../../actions/invoiceactions";

function AddInvoice({ history }) {
  const [invoice, setInvoice] = useState({
    number: "",
    totalPrice: "",
    discount: "",
    vat: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const toAddInvoice = (e) => {
    e.preventDefault();
    dispatch(addInvoiceAction(invoice));
  };
  return (
    <div>
      <h2>Manage Invoice</h2>

      <button onClick={() => history.goBack()}>Back</button>
      <form onSubmit={toAddInvoice}>
        <div>
          <label>Number</label>
          <input type="text" name="number" onChange={handleChange} />
        </div>
        <div>
          <label>TotalPrice</label>
          <input type="text" name="totalPrice" onChange={handleChange} />
        </div>
        <div>
          <label>Discount</label>
          <input type="text" name="discount" onChange={handleChange} />
        </div>
        <div>
          <label>Vat</label>
          <input type="text" name="vat" onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddInvoice;
