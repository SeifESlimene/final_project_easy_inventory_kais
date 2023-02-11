import { hot } from "react-hot-loader/root";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useHistory,
} from "react-router-dom";

import PrivateRoute from "./privateroute";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import ManageInvoice from "./components/invoice/manageinvoice";
import AddInvoice from "./components/invoice/addinvoice";
import GetInvoice from "./components/invoice/getinvoice";
import UpdateInvoice from "./components/invoice/updateinvoice";
import DeleteInvoice from "./components/invoice/deleteinvoice";
import Navbar from "./components/sidebar/navbar";
import ManageProduct from "./components/product/manageproduct";
import AddProduct from "./components/product/addproduct";
import GetProduct from "./components/product/getproduct";
import UpdateProduct from "./components/product/updateproduct";
import GetUsers from "./components/users/getusers";
import Profile from "./components/profile";
import SalesPage from "./components/cashier/sales";

function App() {
  // let history = useHistory();
  const auth = useSelector((state) => state.authReducer);
  return (
    <Router>
      {!auth.isAuth ? (
        <div>
          <Login />
        </div>
      ) : (
        <>
          <Navbar />
          <main className="main-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/users/allUsers" component={GetUsers} />
              <Route exact path="/profile" component={Profile} />
              <Route
                exact
                path="/invoice"
                render={({ match, history }) => (
                  <ManageInvoice match={match} history={history} />
                )}
              />
              <Route
                exact
                path="/products/salePage"
                render={(props) => <SalesPage {...props} />}
              />
              <Route
                exact
                path="/invoice/addInvoice"
                render={({ match, history }) => (
                  <AddInvoice match={match} history={history} />
                )}
              />
              <Route
                exact
                path="/invoice/allInvoice"
                render={(props) => <GetInvoice {...props} />}
              />
              <Route
                path="/invoice/updateInvoice"
                render={({ match, history }) => (
                  <UpdateInvoice match={match} history={history} />
                )}
              />
              <Route
                exact
                path="/invoice/deleteInvoice"
                render={({ match, history }) => (
                  <DeleteInvoice match={match} history={history} />
                )}
              />
              <Route
                exact
                path="/products/addProduct"
                render={({ match, history }) => (
                  <AddProduct match={match} history={history} />
                )}
              />
              <PrivateRoute
                exact
                path="/products/allProduct"
                component={GetProduct}
              />
              <Route exact path="/products" component={ManageProduct}></Route>
              <Route
                path="/products/updateProduct"
                render={({ match, history }) => (
                  <UpdateProduct match={match} history={history} />
                )}
              />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </main>
        </>
      )}
    </Router>
  );
}
export default hot(App);
