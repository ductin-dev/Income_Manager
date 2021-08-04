import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Redirect } from "react-router-dom";

const URI = "http://localhost:8080/";
const GET_EACH_WALLET_API = URI + "api/wallet/show/";
const GET_TRANSACTION_API = URI + "api/wallet/show/transaction/";
const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true,
    cell: (row) => (
      <div>
        <div style={{ fontWeight: 700 }}>{row.id}</div>
      </div>
    ),
  },
  {
    name: "Reason",
    selector: "title",
    sortable: true,
    right: true,
    cell: (row) => <div>{row.title}</div>,
  },
  {
    name: "Amount of Transaction",
    selector: "amount",
    sortable: true,
    right: true,
    cell: (row) => <div style={{ fontWeight: 800 }}>{row.amount}</div>,
  },
  {
    name: "TYPE",
    selector: "type",
    sortable: true,
    right: true,
    cell: (row) =>
      row.type == 1 ? (
        <div style={({ fontWeight: 800 }, { color: "darkorange" })}>USE</div>
      ) : row.type == 2 ? (
        <div style={({ fontWeight: 800 }, { color: "red" })}>ACCIDENT</div>
      ) : row.type == 3 ? (
        <div style={({ fontWeight: 800 }, { color: "blue" })}>SAVE</div>
      ) : (
        <div style={({ fontWeight: 800 }, { color: "green" })}>INCOME</div>
      ),
  },
];

const Transaction = (props) => {
  const [user, setUser] = useState(props.location.state?.user);
  const [isLogged, setIsLogged] = useState(true);

  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState();

  const [choosenWallet, setChoosenWallet] = useState(
    props.location.state?.choosenWallet
  );

  useEffect(() => {
    setIsLogged(
      user === null || user === [] || typeof user === "undefined" ? false : true
    );
  }, [user, isLogged]);

  useEffect(() => {
    if (isLogged) {
      async function fetchData1() {
        const res = await fetch(GET_EACH_WALLET_API + choosenWallet, {
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
          .then((response) => setWallet(response))
          .catch((err) => {});
      }
      async function fetchData2() {
        const res = await fetch(GET_TRANSACTION_API + choosenWallet, {
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
          .then((response) => setTransactions(response))
          .catch((err) => {});
      }

      fetchData1();
      fetchData2();
    }
  }, [isLogged]);

  const rowClickedHandler = (e) => {};

  return (
    <>
      {isLogged ? (
        <div>
          <h1>
            Welcome {user}, here your transaction of{" "}
            <span style={{ color: "darkcyan" }}>Wallet {choosenWallet}</span>,
            <a href="/wallets"> BACK</a>
          </h1>

          <DataTable
            title="Wallet Transaction"
            columns={columns}
            data={transactions}
            onRowClicked={(e) => rowClickedHandler(e)}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Transaction;
