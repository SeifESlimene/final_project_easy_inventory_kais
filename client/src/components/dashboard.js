import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "../actions/authactions";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.user?.role !== "Admin") {
      dispatch(loadUserAction(auth));
    }
  }, []);

  return (
    <div>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/users/allUsers">Users</Link>
    </div>
  );
}

export default hot(Dashboard);
