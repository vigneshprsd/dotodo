import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLink = (
    <div style={{ width: "120px", float: "right" }}>
      <ul className="mt-2">
        <li>
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLink = (
    <div style={{ width: "120px", float: "right" }}>
      <ul className="mt-2">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar bg-dark">
      <span className="text-2xl" style={{ float: "left" }}>
        <Link to="/">
          <i className="fas fa-tasks"></i>{" "}
          <span className="text-orange-500">T</span>RUDU
        </Link>
      </span>
      {!loading && (
        <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
