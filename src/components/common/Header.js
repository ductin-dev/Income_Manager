import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  clearLogin = () => {
    localStorage.clear();
  };

  render() {
    return (
      <header>
        <nav
          className="navbar fixed-top navbar-expand-lg navbar-dark pink scrolling-navbar"
          style={{
            background: "linear-gradient(to right, #6a3093, #a044ff)",
          }}
        >
          <a className="navbar-brand" href="/">
            <strong>
              <span style={{ color: "darkorange" }}>Sat</span>&nbsp;M.M
            </strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink
                  exact
                  activeStyle={{
                    backgroundColor: "white",
                    color: "darkorange",
                  }}
                  to="/"
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeStyle={{
                    backgroundColor: "white",
                    color: "darkorange",
                  }}
                  to="/about"
                  className="nav-link"
                >
                  Information
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={this.clearLogin()}
                >
                  Logout
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Blogs
                </a>
              </li>
            </ul>
            <ul className="navbar-nav nav-flex-icons">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.facebook.com/satfomacej/"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
