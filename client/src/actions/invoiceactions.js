import axios from 'axios';
import {
  ADD_INVOICE_FAILED,
  ADD_INVOICE_SUCCESS,
  GET_INVOICE_FAILED,
  GET_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILED,
  UPDATE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILED,
  DELETE_INVOICE_SUCCESS,
  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILED,
} from './constants';

export const addInvoiceAction = (invoice) => (dispatch) => {

  axios
    .post(`${process.env.API_URL}/invoice/addinvoice`, invoice)
    .then((res) =>
      dispatch({
        type: ADD_INVOICE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_INVOICE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const getInvoicesAction = () => (dispatch) => {
  axios
    .get(`${process.env.API_URL}/invoice/allinvoices`)
    .then((res) =>
      dispatch({
        type: GET_INVOICE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_INVOICE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const postInvoiceAction = (salesList) => (dispatch) => {
  axios
    .post(`${process.env.API_URL}/invoice/postinvoice`,salesList)
    .then((res) =>
      dispatch({
        type: POST_INVOICE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: POST_INVOICE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const updateInvoiceAction = (invoice) => (dispatch) => {
  axios
    .put(`${process.env.API_URL}/invoice/updateinvoice`, invoice)
    .then((res) =>
      dispatch({
        type: UPDATE_INVOICE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_INVOICE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const deleteInvoiceAction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.API_URL}/invoice/deleteinvoice/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_INVOICE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_INVOICE_FAILED,
        payload: err.response.data.errors,
      })
    );
};