import React, {
  // useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import { loadUserAction, logoutUserAction } from "../../actions/authactions";

// import Avatar from "../avatar";

import "./navbar.css";
import logoEasy from "../../assets/images/logoeasy.png";

function Navbar() {
  // const [collapse, setcollapse] = useState(false);
  // const [currentDateTime, setcurrentDateTime] = useState(
  //   new Date().toLocaleDateString()
  // );
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  // const user = useSelector((state) => state.authReducer.user);
  useEffect(() => {
    if (auth?.user?.role !== "Admin") {
      dispatch(loadUserAction(auth));
    }
  }, []);
  // const onToggleCollapse = () => {
  //   setcollapse(!collapse);
  // };
  return (
    <>
      {/* <input type="checkbox" id="sidebar-toggle" /> */}
      <div className="sidebar">
        <div className="brand">
          <img src={logoEasy} />
        </div>
        <div className="sidebar-menu">
          <ul>
            {/* <li style={{ padding: "0 2rem" }}>
              <a href="/">
                <span className="ti-home icons"></span>
                <span className="label-side-bar">Dashboard</span>
              </a>
            </li> */}

            <li style={{ padding: "0 2rem" }}>
              <i className="far fa-box icons"></i>
              <Link to="/users/allUsers">
                <span className="label-side-bar">Users</span>
              </Link>
            </li>
            <li style={{ padding: "0 2rem" }}>
              <i className="far fa-box icons"></i>
              <Link to="/products/allProduct">
                <span className="label-side-bar">Products</span>
              </Link>
            </li>
            <li style={{ padding: "0 2rem" }}>
              <i className="fal fa-file-invoice icons"></i>

              <Link to="/invoice/allInvoice">
                <span className="label-side-bar">Invoices</span>
              </Link>
            </li>

            <li style={{ padding: "0 2rem" }}>
              <Link to="/products/salePage">
                {" "}
                <span className="ti-clipboard icons"></span>
                <span className="label-side-bar">Sales</span>
              </Link>
            </li>

            <li className="logout">
              <div onClick={() => dispatch(logoutUserAction())}>
                <i className="fal fa-power-off power"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="main-content">
        <header>
          <label htmlFor="sidebar-toggle" className="ti-menu-alt"></label>
          <div className="part-right-header">
            <span className="date">{currentDateTime} </span>
            <div className="social-icons">
              <span className="ti-bell"></span>
            </div>
            <div className="header-part-profile">
              <span className="compte-name">
                Good Morning, {user?.firstname}{" "}
              </span>
              <Avatar width="50" height="50" />

              <i
                className="far fa-ellipsis-v three-pt"
                onClick={onToggleCollapse}
              ></i>
              {collapse === true ? (
                <div className="dropdown-profil">
                  <div className="dp-profil-item">
                    <i className="fal fa-user"></i>
                    <Link to="/profile">
                      {" "}
                      <span>Profile</span>
                    </Link>
                  </div>
                  <div className="dp-profil-item">
                    <i className="fal fa-calendar-alt"></i>
                    <span>Calendar</span>
                  </div>
                  <div className="dp-profil-item">
                    <i className="fal fa-sliders-v"></i>
                    <span>Settings</span>
                  </div>
                  <hr className="ligne-log" />
                  <div
                    className="dp-profil-item"
                    onClick={() => dispatch(logoutUserAction())}
                  >
                    <i className="fal fa-power-off power-dropdown"></i>
                    <span>Logout</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>
      </div> */}
    </>
  );
}

export default hot(Navbar);
