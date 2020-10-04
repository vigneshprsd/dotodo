import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="text-5xl font-regular leading-normal mt-0"><i className="fas fa-tasks"></i> <span className="text-orange-500">T</span>RUDU</h1>
          <div className="text-1xl font-regular leading-normal mt-0 mb-5 ">
            Create your todo list by logging into your account
          </div>
          <div className="mt-1">
            <Link to="/register" className="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-black active:bg-orange-600 font-regular uppercase text-sm px-5 py-4 rounded outline-none focus:outline-none ml-1 mb-1">
              Sign Up
            </Link>
            <Link to="/login" className="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-black active:bg-orange-600 font-regular uppercase text-sm px-6 py-4 rounded outline-none focus:outline-none ml-1 mb-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

