import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";

import Constant from "../common/DomainConstant";
import AuthContext from "../../services/Auth";

import loginstyles from "../style/Login.module.css";
import { FcGoogle } from "react-icons/fc";

const URI = Constant;
const CLIENT_ID =
  "888567468389-5h2gfmlvp5blgria6dnauldlbniloaio.apps.googleusercontent.com";

const LOGIN_API = URI + "api/login";
const LOGIN_MAIL_API = URI + "api/login/mail";

const Home = () => {
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    User: {
      username: "",
      password: "",
    },
  });
  const [isCallRequest, setIsCallRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);

  //const [currentFocus, setCurrentFocus] = useState(null);

  //Login API
  useEffect(() => {
    if (isCallRequest) {
      async function fetchData() {
        await fetch(LOGIN_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          method: "POST",
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        })
          .then((response) => response.text())
          .then((text) => {
            if (text.trim() === "") {
              setErrors(true);
            } else authContext.login(text);
          })
          .catch((err) => {
            setErrors(err);
          });
      }
      fetchData();
      setIsCallRequest(false);
    }
  }, [isCallRequest, user, authContext]);

  //Login Mail API
  const responseGoogle = (response) => {
    let email = response?.profileObj?.email;
    let token = response?.tokenId;
    if (email && token) onloginMailHandler(email, token);
  };

  //Form handler
  const emailFocusHandler = (e) => {
    /*if (currentFocus) currentFocus.pause();
    currentFocus = anime({
      targets: "path",
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: "240 1386",
        duration: 700,
        easing: "easeOutQuart",
      },
    });*/
  };
  const passFocusHandler = (e) => {
    /*if (currentFocus) currentFocus.pause();
    currentFocus = anime({
      targets: "path",
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: "240 1386",
        duration: 700,
        easing: "easeOutQuart",
      },
    });*/
  };
  const submitFocusHandler = (e) => {
    /*if (currentFocus) currentFocus.pause();
    currentFocus = anime({
      targets: "path",
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: "530 1386",
        duration: 700,
        easing: "easeOutQuart",
      },
    });*/
  };

  //Login Handler
  const onLoginHandler = (event) => {
    event.preventDefault();
    setIsCallRequest(true);
  };

  //Login Mail Handler
  const onloginMailHandler = (email, token) => {
    setIsLoading(true);
    async function fetchData() {
      await fetch(LOGIN_MAIL_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          token: token,
        }),
      })
        .then((response) => response.text())
        .then((text) => {
          if (text.trim() === "") {
            setErrors(true);
          } else authContext.login(text);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
    fetchData();
    setIsLoading(false);
  };

  //Type Handler
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") onLoginHandler(e);
  };

  return (
    <>
      {authContext.isLoggedIn === true ? (
        <Redirect
          to={{
            pathname: "/wallets",
          }}
        />
      ) : (
        <>
          <div className={loginstyles.page}>
            <div className={loginstyles.container}>
              <div className={loginstyles.left} style={{ height: "100%" }}>
                <div className={loginstyles.login}>Login</div>
                <div className={loginstyles.eula}>
                  (1) By logging in you agree to the ridiculously long terms
                  that you didn't bother to read<br></br>
                  <GoogleLogin
                    clientId={CLIENT_ID}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <button
                        className="btn btn-info"
                        onClick={renderProps.onClick}
                        style={{
                          color: "white",
                          backgroundColor: "darkorange",
                          fontWeight: 700,
                          textAlign: "center",
                          borderRadius: 5,
                          marginTop: 10,
                        }}
                      >
                        <FcGoogle
                          style={{
                            position: "inherit",
                            width: "fit-content",
                            stroke: "white",
                            color: "white",
                          }}
                        />
                        &nbsp;Login with Google
                      </button>
                    )}
                  ></GoogleLogin>
                </div>
              </div>
              <div className={loginstyles.right}>
                <svg className={loginstyles.svgLogin} viewBox="0 0 320 300">
                  <defs>
                    <linearGradient
                      id="linearGradient"
                      x1="13"
                      y1="193.49992"
                      x2="307"
                      y2="193.49992"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ff00ff" offset="0" id="stop876" />
                      <stop stopColor="#ff0000" offset="1" id="stop878" />
                    </linearGradient>
                  </defs>
                  <path
                    className={loginstyles.pathLogin}
                    d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
                  />
                </svg>
                <div className={loginstyles.form}>
                  <label className={loginstyles.labelLogin} htmlFor="email">
                    Username / Email
                  </label>
                  <input
                    className={loginstyles.inputLogin}
                    id="email"
                    type="text"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => emailFocusHandler(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    placeholder="example@email.com"
                  />
                  <label className={loginstyles.labelLogin} htmlFor="password">
                    Password
                  </label>
                  <input
                    className={loginstyles.inputLogin}
                    id="password"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => passFocusHandler(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    placeholder="********"
                  />
                  <br></br> <br></br>
                  {isCallRequest === true || isLoading === true ? (
                    <span
                      style={{
                        textAlign: "center",
                        color: "darkorange",
                        fontWeight: 700,
                        margin: "0 auto",
                        display: "table",
                      }}
                    >
                      Logging...
                    </span>
                  ) : (
                    <input
                      className={loginstyles.inputLogin}
                      type="submit"
                      id="submit"
                      value="Submit"
                      onClick={onLoginHandler}
                      onFocus={(e) => submitFocusHandler(e)}
                      style={{ fontWeight: 700 }}
                    />
                  )}
                  <LoginSuccess hasError={hasError} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

//Error mess
const LoginSuccess = (props) => {
  if (props.hasError) {
    return (
      <div
        style={{
          color: "orangered",
          fontWeight: 700,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        Fail, check your username and password
      </div>
    );
  }
  return null;
};

export default Home;
