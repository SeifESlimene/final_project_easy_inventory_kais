import React from 'react'

function updateInvoice({history}) {
    return (
        <div>
            <button onClick={() => history.goBack()}>Back</button>
        </div>
    )
}

export default updateInvoice
