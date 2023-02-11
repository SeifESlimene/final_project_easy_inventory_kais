import axios from "axios";
import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_SUCCESS,
  INCREMENT_PRODUCT_QUANTITY,
  DECREMENT_PRODUCT_QUANTITY,
} from "./constants";

export const incrementQuantity = (productId) => ({
  type: INCREMENT_PRODUCT_QUANTITY,
  payload: { productId },
});

export const decrementQuantity = (productId) => ({
  type: DECREMENT_PRODUCT_QUANTITY,
  payload: { productId },
});

export const addProductAction = (product) => (dispatch) => {
  axios
    .post(`${process.env.API_URL}/products/addProduct`, product)
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const getProductAction = () => (dispatch) => {
  axios
    .get(`${process.env.API_URL}/products/salePage`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const updateProductAction = (id, product) => {
  return (dispatch) => {
    axios
      .put(`${process.env.API_URL}/products/updateProduct/${id}`, product)
      .then((res) => {
        return dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: UPDATE_PRODUCT_FAILED,
          payload: err.response.data.errors,
        })
      );
  };
};

export const deleteProductAction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.API_URL}/products/deleteproduct/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};
