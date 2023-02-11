import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "./actions/authactions";

function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth && !auth.user) dispatch(loadUserAction(auth));
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default hot(PrivateRoute);
