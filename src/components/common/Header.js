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
                <a className="nav-link" href="/#">
                  {" "}
                  <NavLink
                    exact
                    activeStyle={{
                      backgroundColor: "white",
                      color: "darkorange",
                    }}
                    to="/"
                    className="my-link"
                  >
                    Home
                  </NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  {" "}
                  <NavLink
                    exact
                    activeStyle={{
                      backgroundColor: "white",
                      color: "darkorange",
                    }}
                    to="/about"
                    className="my-link"
                  >
                    Information
                  </NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#" onClick={this.clearLogin}>
                  {" "}
                  <NavLink to="/">Logout</NavLink>
                </a>
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
