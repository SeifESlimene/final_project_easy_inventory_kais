import { combineReducers } from "redux";
import { authReducer } from "./authreducer";
import { invoiceReducer } from "./invoicereducer";
import { productReducer } from "./productreducer";
import { userReducer } from "./userreducer";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

const rootReducer = combineReducers({
  authReducer,
  invoiceReducer,
  productReducer,
  userReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
