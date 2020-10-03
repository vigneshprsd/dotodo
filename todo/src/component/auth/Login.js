import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="text-3xl text-orange-500">Sign In</h1>
      <p className="text-1xl text-white">
  <i className="fas fa-user"></i>{' '}Sign Into Your Account
      </p>
      <form className="form mt-6" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            style={{
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              color:"white"
            }}
            className="bg-transparent placeholder-gray-100"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            style={{
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              color:"white"

            }}
            className="bg-transparent placeholder-gray-100"
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => onChange(e)}
          />
        </div>
        <button
          type="submit"
          className="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-black active:bg-orange-600 font-regular uppercase text-sm px-4 py-4 rounded outline-none focus:outline-none ml-1 mb-1"
        >
          Login
        </button>
      </form>
      <p className="text-1xl text-white mt-2">
        Don't have an account? <Link className="text-orange-500" to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
