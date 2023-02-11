import "../assets/scss/login.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hot } from "react-hot-loader/root";
import FormControl from "@material-ui/core/FormControl";

import Avatar from "./avatar";

import { loginUserAction } from "../actions/authactions";

function Login() {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({ email: "", password: "" });
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (auth.isAuth) {
  //     history.push("/profile");
  //   } else if (auth.errors[0].msg === "Wrong Password!") {
  //     setpasswordError("Password is incorrect, did you forget it?");
  //   } else if ((auth.errors[0].msg = "Please register before!")) {
  //     setemailError("Email not associated with any account.");
  //   }
  // }, [auth.isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(info));
  };

  return (
    <div className="loginContainer">
      <div className="login-component">
        <div className="login-form">
          <Avatar width="180" height="195" />
          <form className="container-form" onSubmit={handleSubmit}>
            <FormControl className="form-control">
              <label
                className="label-Name"
                htmlFor="input-with-icon-adornment1"
              >
                Email
              </label>
              <input
                className={emailError === "" ? "inputLogin" : "inputLoginerr"}
                placeholder="Enter Your Email"
                type="text"
                name="email"
                onChange={handleChange}
                id="input-with-icon-adornment1"
              />
              <p className="login-err">{emailError}</p>
            </FormControl>
            <FormControl className="form-control">
              <label
                className="label-Name"
                htmlFor="input-with-icon-adornment2"
              >
                Password
              </label>
              <input
                className={
                  passwordError === "" ? "inputLogin" : "inputLoginerr"
                }
                placeholder="Enter Your Password"
                type="password"
                name="password"
                onChange={handleChange}
                id="input-with-icon-adornment2"
              />
              <p className="login-err">{passwordError}</p>
            </FormControl>
            <button className="loginButton btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default hot(Login);
