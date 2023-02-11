import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function manageInvoice({history}) {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <h2>Manage Invoice</h2>
      <button onClick={() => history.goBack()}  >Back</button>

     
      <button>
        <Link to="/invoice/addInvoice">Add Invoice</Link>
      </button>
      

      
      <button>
        <Link to="/invoice/allInvoice">Get All Invoices</Link>
      </button>
      

    </div>
  );
}

export default manageInvoice;
