import { hot } from "react-hot-loader/root";
import React from "react";
import { Link } from "react-router-dom";
import telechargement from "../assets/images/telechargement.png";
import "../assets/scss/home.css";

function Home() {
  return (
    <div>
      <p className="countUsers">Accueil</p>
      <div className="home-page">
        <button className="add btn">
          <Link to="/register">
            <span style={{ color: "white" }}>Register</span>{" "}
          </Link>
        </button>
        <img src={telechargement} alt="" />
      </div>
    </div>
  );
}

export default hot(Home);
