import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Wallet = (props) => {
  const [user, setUser] = useState(props.location.state?.user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      {user === null || user === [] || typeof user === "undefined" ? (
        <Redirect to="/" />
      ) : (
        <div>
          <h1>Welcome {user}, here your Wallets</h1>
        </div>
      )}
    </>
  );
};

export default Wallet;
