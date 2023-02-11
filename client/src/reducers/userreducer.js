import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
} from "../actions/constants";

const initState = {
  users: [],
  errors: null,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        errors: null,
        user: action.payload,
        usersCount: action.payload.length,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        user: state.user.filter((el) => el._id !== action.payload._id),
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        errors: null,
        user: state.user.map((el) => {
          if (el._id === action.payload._id) return action.payload;
          return el;
        }),
      };

    case GET_USER_FAILED:
    case UPDATE_USER_FAILED:
    case DELETE_USER_FAILED:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
