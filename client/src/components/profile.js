import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Avatar from "./avatar";

import { loadUserAction } from "../actions/authactions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (auth?.user?.role !== "Admin") {
      dispatch(loadUserAction(auth));
    }
  }, []);

  const classes = useStyles();
  return (
    <div>
      <div className="background-profile">
        <div className="img-profil">
          <Avatar width="100" height="115" />
        </div>
        <div className="small-detail">
          <p style={{ fontSize: "2rem", fontWeight: "700", color: "#494949" }}>
            {auth.user.firstname} &nbsp; {auth.user.lastname}
          </p>
          <p
            style={{ fontSize: "1.8rem", fontWeight: "500", color: "#494949" }}
          >
            {auth.user.email}
          </p>
        </div>
      </div>
      <div>
        <div className=" all my-profil">
          <i className="fal fa-user"></i>
          <span style={{ fontWeight: "500" }}>My profile</span>
        </div>
        <div className="active-tabs"></div>
        <div className="line"></div>
      </div>
      <p className="nv-membre" style={{ marginTop: "4rem" }}>
        Personnel details
      </p>
      <form className="form-profile">
        <div className="grid-form">
          <Grid direction="column" container spacing={3}>
            <Grid item className="grid-flex">
              <span className="title">Firstname: </span>
              <Paper className={classes.paper}>
                <input
                  value={auth.user.firstname}
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your First Name"
                  type="text"
                  name="firstname"
                />
              </Paper>
            </Grid>

            <Grid item className="grid-flex">
              <span className="title">Lastname</span>
              <Paper className={classes.paper}>
                <input
                  value={auth.user.lastname}
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Last Name"
                  type="text"
                  name="lastname"
                />
              </Paper>
            </Grid>

            <Grid item className="grid-flex">
              <span className="title">Number</span>
              <Paper className={classes.paper}>
                <input
                  value={auth.user.phone}
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Phone"
                  type="text"
                  name="phone"
                />
              </Paper>
            </Grid>

            <Grid item className="grid-flex">
              <span className="title">Email</span>
              <Paper className={classes.paper}>
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Email"
                  type="text"
                  name="email"
                  value={auth.user.email}
                />
              </Paper>
            </Grid>
            <Grid item className="grid-flex">
              <span className="title">Role</span>
              <Paper className={classes.paper}>
                <input
                  style={{ borderRadius: "15px" }}
                  type="text"
                  value={auth.user.role}
                />
              </Paper>
            </Grid>
            <Grid item className="grid-flex">
              <span className="title">Genre</span>
              <Paper className={classes.paper}>
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Email"
                  type="text"
                  name="email"
                  value=""
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}

export default hot(Profile);
