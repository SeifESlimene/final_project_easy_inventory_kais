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
  DECREMENT_PRODUCT_QUANTITY
} from "../actions/constants";

const initState = {
  invoice: [],
  errors: null,
  product: [],
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: [...state.product, action.payload],
        errors: null,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        errors: null,
        product: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: state.product.filter((el) => el._id !== action.payload._id),
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        errors: null,
        product: state.product.map((el) => {
          if (el._id === action.payload._id) return action.payload;
          return el;
        }),
      };

    case INCREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        errors: null,
        product: state.product.map((el) => {
          if (el._id === action.payload.productId) {
            el.quantity += 1
            el.number -= 1
          }
          return el
        }),
      };

    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        errors: null,
        product: state.product.map((el) => {
          if (el._id === action.payload.productId && el.quantity >= 1) {
            el.quantity -= 1
            el.number += 1
          }
          return el
        }),
      };

    case GET_PRODUCT_FAILED:
    case ADD_PRODUCT_FAILED:
    case UPDATE_PRODUCT_FAILED:
    case DELETE_PRODUCT_FAILED:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
