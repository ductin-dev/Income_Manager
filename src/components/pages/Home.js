import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../services/Auth";
import Constant from "../common/DomainConstant";

import loginstyles from "../style/Login.module.css";

const URI = Constant;

const LOGIN_API = URI + "api/login";

const Home = () => {
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    User: {
      username: "",
      password: "",
    },
  });
  const [isCallRequest, setIsCallRequest] = useState(false);
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
  const onLoginHandler = (event) => {
    event.preventDefault();
    setIsCallRequest(true);
  };
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
              <div className={loginstyles.left}>
                <div className={loginstyles.login}>Login</div>
                <div className={loginstyles.eula}>
                  By logging in you agree to the ridiculously long terms that
                  you didn't bother to read
                </div>
              </div>
              <div className={loginstyles.right}>
                <svg viewBox="0 0 320 300">
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
                  <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
                </svg>
                <div className={loginstyles.form}>
                  <label htmlFor="email">Username / Email</label>
                  <input
                    id="email"
                    type="text"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => emailFocusHandler(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    placeholder="example@email.com"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => passFocusHandler(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    placeholder="********"
                  />
                  <input
                    type="submit"
                    id="submit"
                    value="Submit"
                    onClick={onLoginHandler}
                    onFocus={(e) => submitFocusHandler(e)}
                  />
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
  const red = {
    color: "red",
    padding: "10px",
  };
  if (props.hasError) {
    return <div style={red}>Fail, check your username and password</div>;
  }
  return null;
};

export default Home;
