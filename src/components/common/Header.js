import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  clearLogin = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <ul>
          <li>
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
          </li>
          <li>
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
          </li>
          <li
            onClick={this.clearLogin}
            style={({ color: "red" }, { cursor: "alias" })}
          >
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>

        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Header;
