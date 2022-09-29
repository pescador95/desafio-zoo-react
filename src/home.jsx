import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const Home = () => (
  <Fragment className="home-content">
    <h1 className="home-title">Desafio Zoo</h1>
    <ul className="content-button-column home-content">
      <li className="home-content">
        <Link to="/login" className="button">
          LOGIN
        </Link>
      </li>
    </ul>
  </Fragment>
);

export default Home;
