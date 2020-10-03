import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">TODOOOO</h1>
          <p class="lead">
            Create your TODO list and Access it everwhere
          </p>
          <div class="buttons">
            <Link to="/register" className="btn btn-primLinkry">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
