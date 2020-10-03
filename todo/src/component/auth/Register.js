import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="text-3xl text-orange-500">Sign Up</h1>
      <p className="text-1xl text-white">
        <i className="fas fa-user"></i> Create Your Account
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
            value={name}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Name"
            name="name"
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
        <div className="form-group">
          <input
          style={{
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
            color:"white"

          }}
            className="bg-transparent placeholder-gray-100"
            value={password2}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-black active:bg-orange-600 font-regular uppercase text-sm px-4 py-4 rounded outline-none focus:outline-none ml-1 mb-1"
          value="Register"
        />
      </form>
      <p className="text-1xl text-white mt-2">
        Already have an account? <Link className="text-orange-500" to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
