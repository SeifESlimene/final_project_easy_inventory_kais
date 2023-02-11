import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction, deleteUsersAction } from "../../actions/useractions";
import { Link } from "react-router-dom";
import "./users.css";

function GetUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const usersCount = useSelector((state) => state.userReducer.usersCount);

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  return (
    <div>
      <p className="countUsers"> {usersCount ? usersCount : 0} Users</p>
      {/* <div>
        <div className="container">
          <div>
            <span className="all">All</span>
          </div>
          <div className="pseudo-search">
            <input
              type="text"
              className="input-search"
              placeholder="chercher..."
              required
            />

            <button className="fa fa-search" type="submit"></button>
          </div>
        </div>
        <div className="active-tabs"></div>
        <div className="line"></div>
      </div> */}

      <div className="all-users">
        {user &&
          user.map((user) => (
            <div className="card" key={user._id}>
              <i
                className="fal fa-trash-alt dots"
                onClick={() => dispatch(deleteUsersAction(user._id))}
              ></i>
              <div className="circle-user">
                <div className="contour-circle">
                  <i className="fal fa-user icon-user"></i>
                </div>
              </div>
              <div className="details">
                <p className="detail-user">
                  {user.firstname} {user.lastname}
                </p>
                <p className="detail-user">{user.email}</p>
                <p className="detail-user-role">{user.role}</p>
              </div>
              {/* <div className="card-bottom">
                <Link to={`/users/updateUser/${user._id}`}>
                  <span className="update-user">Update</span>
                </Link>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default hot(GetUsers);
