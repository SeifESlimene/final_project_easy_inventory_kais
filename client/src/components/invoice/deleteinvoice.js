import React from "react";

function DeleteInvoice({ history }) {
  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}

export default DeleteInvoice;
