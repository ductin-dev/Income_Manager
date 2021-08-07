import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Redirect } from "react-router-dom";

const URI = "http://localhost:8080/";
const GET_WALLET_API = URI + "api/wallet/show/all";
const columns = [
  {
    name: "Id",
    sortable: true,
    cell: (row) => (
      <div>
        <div style={{ fontWeight: 700, color: "darkorange" }}>
          Monthly renew date: {row.perior}
        </div>
        id: {row.id}
      </div>
    ),
  },
  {
    name: "TOTAL",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={({ fontWeight: 800 }, { color: "forestgreen" })}>
        {row.actualData}
      </div>
    ),
  },
  {
    name: "Target used / month",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800 }}>{row.targetData.split("|")[0]}</div>
    ),
  },
  {
    name: "Accident / month",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={({ fontWeight: 800 }, { color: "red" })}>
        {row.targetData.split("|")[1]}
      </div>
    ),
  },
  {
    name: "Save / month",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800 }}>{row.targetData.split("|")[2]}</div>
    ),
  },
  {
    name: "Income / month",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800 }}>{row.targetData.split("|")[3]}</div>
    ),
  },
];

const Wallet = (props) => {
  const [user] = useState(props.location.state?.user);
  const [isLogged, setIsLogged] = useState(true);
  const [wallets, setWallets] = useState();
  const [choosenWallet, setChoosenWallet] = useState(null);

  useEffect(() => {
    setIsLogged(
      user === null || user === [] || typeof user === "undefined" ? false : true
    );
  }, [user, isLogged]);

  useEffect(() => {
    if (isLogged) {
      async function fetchData() {
        const res = await fetch(GET_WALLET_API, {
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
          .then((response) => setWallets(response))
          .catch((err) => {});
      }

      fetchData();
    }
  }, [isLogged]);

  const rowClickedHandler = (e) => {
    setChoosenWallet(e.id);
  };

  return (
    <>
      {isLogged ? (
        <div>
          <h1>Welcome {user}, here your Wallets</h1>
          <DataTable
            title="Wallets list"
            columns={columns}
            data={wallets}
            onRowClicked={(e) => rowClickedHandler(e)}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
      {choosenWallet !== null ? (
        <Redirect
          to={{
            pathname: "/wallet/" + choosenWallet,
            state: { choosenWallet: choosenWallet, user: user },
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Wallet;
