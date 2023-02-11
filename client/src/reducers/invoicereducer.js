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
} from "../actions/constants";

const initState = {
  invoice: [],
  errors: null,
  product: [],
  count: 0,
};

export const invoiceReducer = (state = initState, action) => {
  switch (action.type) {

    case POST_INVOICE_SUCCESS:
      return {
        ...state,
        INVOICE: [...state.INVOICE, action.payload],
      };

    case GET_INVOICE_SUCCESS:
      return {
        ...state,
        errors: null,
        INVOICE: action.payload,
      };

    case ADD_INVOICE_SUCCESS:
      return {
        ...state,
        invoice: [...state.invoice, action.payload],
        errors: null,
      };

    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoice: state.invoice.filter((el) => el._id !== action.payload._id),
      };

    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        errors: null,
        invoice: state.invoice.map((el) => {
          if (el._id === action.payload._id) return action.payload;
          return el;
        }),
      };

    case UPDATE_INVOICE_FAILED:
    case GET_INVOICE_FAILED:
    case ADD_INVOICE_FAILED:
    case DELETE_INVOICE_FAILED:
    case POST_INVOICE_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
      
    default:
      return state;
  }
};
