import React, { useState } from "react";

import Constant from "../components/common/DomainConstant";

const URI = Constant;

const AUTH_USER_API = URI + "api/authuser";

const AuthContext = React.createContext({
  token: "",
  authUser: {},
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("JWTToken"));
  const [authUser, setAuthUser] = useState(localStorage.getItem("AuthUser"));
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem("JWTToken", token);
    setToken(token);

    async function fetchData() {
      const abc = await fetch(AUTH_USER_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          JWT: token,
        },
        method: "POST",
      });
      abc
        .json()
        .then((response) => {
          localStorage.setItem("AuthUser", JSON.stringify(response));
          setAuthUser(JSON.stringify(response));
        })
        .catch((err) => err);
    }
    fetchData();
  };
  const logoutHandler = () => {
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("AuthUser");
    setToken(null);
    setAuthUser(null);
  };
  const contextValue = {
    token: token,
    authUser: authUser,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
