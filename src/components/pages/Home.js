import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

//const URI = "http://localhost:8080/";
const URI = "https://www.satdevelop.com/";

const LOGIN_API = URI + "api/login";

const Home = (props) => {
  const [user, setUser] = useState({
    User: {
      username: "",
      password: "",
    },
  });
  const [isCallRequest, setIsCallRequest] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [response, setResponse] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  //Call API
  useEffect(() => {
    if (isCallRequest) {
      async function fetchData() {
        const res = await fetch(LOGIN_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        });

        res
          .json()
          .then((response) => setResponse(response))
          .catch((err) => setErrors(err));
      }

      fetchData();
      setIsCallRequest(false);
    }
  }, [isCallRequest, user]);

  //Check auth and redirect
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(LOGIN_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //credentials: "include",
        method: "POST",
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
        }),
      });

      res
        .json()
        .then((response) => setResponse(response))
        .catch((err) => {});
    }

    fetchData();
    if (response !== null && response !== []) {
      localStorage.setItem("username", response.uName);
      localStorage.setItem("password", response.uPass);
      setIsLogged(true);
    }
  }, [response]);

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

  const style = {
    padding: "10px",
  };

  return (
    <>
      {isLogged ? (
        <Redirect
          to={{
            pathname: "/wallets",
            state: { user: response.uName },
          }}
        />
      ) : (
        <div>
          <h1>Home Page</h1>
          <form
            style={style}
            method="POST"
            onSubmit={(event) => onLoginHandler(event)}
          >
            <label> Username </label>
            <br />
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <label> Password </label>
            <br />
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />
            <button type="submit">Login</button>
          </form>
          <LoginSuccess hasError={hasError} />
        </div>
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
