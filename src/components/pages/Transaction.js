import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import styles from "../module/ProgressBar.module.css";

const URI = "http://localhost:8080/";
const GET_EACH_WALLET_API = URI + "api/wallet/show/";

const GET_TRANSACTION_API = URI + "api/wallet/show/transaction/";
const ADD_TRANSACTION_API = URI + "api/transaction/add";
const DELETE_TRANSACTION_API = URI + "api/transaction/delete";

const current_month_columns = [
  {
    name: "Total",
    sortable: true,
    right: true,
    cell: (row) => <div>{row.total}</div>,
  },
  {
    name: "Used of month",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "red" }}>{row.used}</div>
    ),
  },
  {
    name: "Remain of use",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "blue" }}>{row.remain}</div>
    ),
  },
  {
    name: "Accident",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "blue" }}>{row.accident}</div>
    ),
  },
  {
    name: "Predict save",
    sortable: true,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "green" }}>{row.save}</div>
    ),
  },
];
const columns = [
  {
    name: "Id",
    sortable: true,
    cell: (row) => (
      <div>
        <div style={{ fontWeight: 700 }}>{row.id}</div>
      </div>
    ),
  },
  {
    name: "Date",
    sortable: true,
    right: true,
    cell: (row) => <div>{row.date}</div>,
  },
  {
    name: "Reason",
    sortable: true,
    right: true,
    cell: (row) => <div>{row.title}</div>,
  },
  {
    name: "Amount of Transaction",
    sortable: true,
    right: true,
    cell: (row) => <div style={{ fontWeight: 800 }}>{row.amount}</div>,
  },
  {
    name: "TYPE",
    sortable: true,
    right: true,
    cell: (row) =>
      row.type === 1 ? (
        <div style={{ fontWeight: 800, color: "darkorange" }}>USE</div>
      ) : row.type === 2 ? (
        <div style={{ fontWeight: 800, color: "red" }}>ACCIDENT</div>
      ) : row.type === 3 ? (
        <div style={{ fontWeight: 800, color: "blue" }}>SAVE</div>
      ) : (
        <div style={{ fontWeight: 800, color: "green" }}>INCOME</div>
      ),
  },
  {
    name: "Action",
    sortable: false,
    right: true,
    cell: (row) => (
      <div>
        <button className="btn btn-primary m-1">View</button>
        <button
          className="btn btn-danger m-1"
          onClick={() => handleDeleteTransaction(row.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

//Delete transaction
const handleDeleteTransaction = (e) => {
  const deleteTransaction = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchData();
        Swal.fire("Deleted!", "Your transaction has been deleted.", "success");
      }
    });

    async function fetchData() {
      const res = await fetch(DELETE_TRANSACTION_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //credentials: "include",
        method: "POST",
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          transactionId: e,
        }),
      });

      res
        .json()
        .then((response) => {})
        .catch((err) => {});
    }
  };
  deleteTransaction();
};

const customSort = (rows, selector, direction) => {
  return rows.sort((rowA, rowB) => {
    // use the selector function to resolve your field names by passing the sort comparitors

    const aField = selector(rowA.innerText);
    const bField = selector(rowB.innerText);

    let comparison = 0;

    if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }

    return direction === "desc" ? comparison * -1 : comparison;
  });
};

const Transaction = (props) => {
  const [user] = useState(props.location.state?.user);
  const [isLogged, setIsLogged] = useState(true);

  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState();
  const [choosenWallet] = useState(props.location.state?.choosenWallet);

  const [periorProgress, setPeriorProgress] = useState(0);
  const [titleProgress, setTitleProgress] = useState();
  const [totalUsed, setTotalUsed] = useState({
    used: 0,
    accident: 0,
    income: 0,
  });

  //Logged
  useEffect(() => {
    setIsLogged(
      user === null || user === [] || typeof user === "undefined" ? false : true
    );
  }, [user, isLogged]);

  //Get main data
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
  }, [isLogged, choosenWallet]);

  const rowClickedHandler = (e) => {};

  //Get progress data
  useEffect(() => {
    let periorDay = wallet?.perior; //19
    let currentMonth = new Date().getMonth(); //+1
    let currentYear = new Date().getFullYear();
    let currentDay = new Date().getDay(); //+1
    //console.log(currentYear + "|" + currentMonth + "|" + currentDay);

    let periorStart =
      currentDay + 1 < periorDay
        ? new Date(currentYear, currentMonth - 1, periorDay, 0, 0)
        : new Date(currentYear, currentMonth, periorDay, 0, 0); // 9:00 AM
    let periorEnd =
      currentDay + 1 < periorDay
        ? new Date(currentYear, currentMonth, periorDay - 1, 0, 0)
        : new Date(currentYear, currentMonth + 1, periorDay - 1, 0, 0); // 5:00 PM
    let periorCurrent = new Date(currentYear, currentMonth, currentDay, 0, 0); // 5:00 PM

    let totalDiff = periorEnd - periorStart;
    let currentDiff = periorEnd - periorCurrent;
    //console.log(totalDiff + "|" + currentDiff);
    setPeriorProgress(100 - (currentDiff / totalDiff) * 100);

    let start =
      periorStart.toLocaleDateString() +
      " " +
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    let end =
      periorEnd.toLocaleDateString() +
      " " +
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTitleProgress("Current perior: " + start + " - " + end);
  }, [wallet?.perior]);

  //New transaction
  const handleNewTransaction = () => {
    const newTransaction = async () => {
      const swal = await Swal.fire({
        title: "Add transaction",
        icon: "info",
        html:
          '<div class="form-group">' +
          '<label for="transaction_add_amount">Amount (VND)</label>' +
          '<input type="text" class="form-control" id="transaction_add_amount" placeholder="ex: 50.000">' +
          "</div>" +
          '<div class="form-group">' +
          '<label for="transaction_add_type">Type</label>' +
          '<select class="form-control" id="transaction_add_type">' +
          " <option value='1'>1 - Normal Used (-)</option>" +
          " <option value='2'>2 - Accidental Reason (-)</option>" +
          " <option value='3'>3 - Income (+)</option>" +
          " </select>" +
          "</div>" +
          '<div class="form-group">' +
          '<label for="transaction_add_title">Reason Description</label>' +
          '<textarea class="form-control" id="transaction_add_title" rows="3"></textarea>' +
          "</div>" +
          '<div class="form-group">' +
          '<label for="transaction_add_date">Date of transaction</label>' +
          '<input type="date" class="form-control" id="transaction_add_date" ></input>' +
          "</div>",
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        focusConfirm: false,
        preConfirm: () => ({
          amount: document.getElementById("transaction_add_amount").value,
          type: document.getElementById("transaction_add_type").value,
          title: document.getElementById("transaction_add_title").value,
          date: document.getElementById("transaction_add_date").value,
        }),
      });
      let typedData = (swal && swal.value) || swal.dismiss;

      async function fetchData() {
        const res = await fetch(ADD_TRANSACTION_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            wallet: choosenWallet,
            title: typedData.title,
            type: typedData.type,
            amount: typedData.amount,
            date: typedData.date,
          }),
        });

        res
          .json()
          .then((response) => {
            Swal.fire({
              title: response,
              width: 600,
              padding: "3em",
              background:
                '#fff url("https://sweetalert2.github.io/images/trees.png")',
              backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
              `,
            });
          })
          .catch((err) => {});
      }
      fetchData();
    };
    newTransaction();
  };

  return (
    <>
      {isLogged ? (
        <div>
          <h1>
            Welcome {user}, here your transaction of{" "}
            <span style={{ color: "darkcyan" }}>Wallet {choosenWallet}</span>,
            <a href="/wallets"> BACK</a>
          </h1>
          <div className={styles.progress}>
            <div
              className={styles.progress_done}
              style={{ width: periorProgress + "%" }}
            >
              {Math.round(periorProgress)} %
            </div>
          </div>

          <DataTable
            title={titleProgress}
            columns={current_month_columns}
            data={[
              {
                total: wallet?.actualData,
                used: totalUsed.used + " / " + wallet?.targetData.split("|")[0],
                remain: wallet?.targetData.split("|")[0] - totalUsed.used,
                accident:
                  totalUsed.accident + " / " + wallet?.targetData.split("|")[1],
                save:
                  totalUsed.income -
                  totalUsed.used -
                  totalUsed.accident +
                  " / " +
                  wallet?.targetData.split("|")[2],
              },
            ]}
            onRowClicked={(e) => rowClickedHandler(e)}
          />

          <DataTable
            sortFunction={customSort}
            title={
              <div className="row">
                <h2 style={{ float: "left", width: "fit-content" }}>
                  Transactions
                </h2>
                <div
                  style={{
                    float: "right",
                    width: "fit-content",
                    marginRight: 15,
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleNewTransaction()}
                  >
                    New transaction
                  </button>
                </div>
              </div>
            }
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
