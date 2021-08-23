import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { readableTime } from "../../../services/DateTimeServices";

import textstyles from "../../style/InfoText.module.css";

import Greetings from "./part/Greetings";

import Constant from "../../common/DomainConstant";
import WalletDetails from "./part/WalletDetails";
import AuthContext from "../../../services/Auth";

const URI = Constant;

const GET_EACH_WALLET_API = URI + "api/wallet/show/";
const GET_CURRENT_PERIOR_API = URI + "api/wallet/show/currentvalue/";
const GET_WALLET_HISTORY = URI + "api/wallet/show/history/";

const GET_TRANSACTION_API = URI + "api/wallet/show/transaction/";
const ADD_TRANSACTION_API = URI + "api/transaction/add";
const DELETE_TRANSACTION_API = URI + "api/transaction/delete";

//Current value table
const current_month_columns = [
  {
    name: <span style={{ fontWeight: 700 }}>Actual Total</span>,
    sortable: false,
    right: true,
    cell: (row) => <div>{row.total}</div>,
  },
  {
    name: "Used / Target",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "red" }}>{row.used}</div>
    ),
  },
  {
    name: "Avaliable can use (your target)",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "blue" }}>{row.remain}</div>
    ),
  },
  {
    name: "Accident / Target",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "blue" }}>{row.accident}</div>
    ),
  },
  {
    name: "Predict save / Target",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "green" }}>{row.save}</div>
    ),
  },
];

//History table
const history_columns = [
  {
    name: "",
    sortable: false,
    right: true,
    cell: (row) => (
      <div>
        {
          {
            "-1": (
              <span
                className={textstyles.display_text}
                style={{ backgroundColor: "forestgreen" }}
              >
                Perior Ended
              </span>
            ),

            0: <span className={textstyles.display_text}>Active !</span>,

            1: (
              <span
                className={textstyles.display_text}
                style={{ backgroundColor: "darkgray" }}
              >
                Future
              </span>
            ),
          }[row.status]
        }
      </div>
    ),
  },
  {
    name: <span style={{ fontWeight: 700 }}>Actual Total (Each month)</span>,
    sortable: false,
    right: true,
    cell: (row) => (
      <div>
        <span
          className={textstyles.display_text}
          style={{ backgroundColor: "blue" }}
        >
          {row.totalWallet}
        </span>
      </div>
    ),
  },
  {
    name: "Used of month",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "red" }}>{row.percentUsed}</div>
    ),
  },
  {
    name: "Income",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "green" }}>{row.income}</div>
    ),
  },
  {
    name: "Percent Save",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800, color: "blue" }}>
        {Math.round(row.percentSave * 100) / 100 + " %"}
      </div>
    ),
  },
  {
    name: "Perior Start",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800 }}>{readableTime(row.periorStart)}</div>
    ),
  },
  {
    name: "Perior End",
    sortable: false,
    right: true,
    cell: (row) => (
      <div style={{ fontWeight: 800 }}>{readableTime(row.periorEnd)}</div>
    ),
  },
];

const Transaction = (props) => {
  const authContext = useContext(AuthContext);

  const [user] = useState(JSON.parse(authContext.authUser)?.uName);

  const [transactions, setTransactions] = useState();
  const [transactionsUpdated, setTransactionsUpdated] = useState(false);

  const [wallet, setWallet] = useState();
  const [walletHistory, setWalletHistory] = useState();
  let { choosenWallet } = useParams();

  const [periorProgress, setPeriorProgress] = useState(0);
  const [titleProgress, setTitleProgress] = useState();
  const [totalUsed, setTotalUsed] = useState({
    used: 0,
    accident: 0,
    income: 0,
    save: 0,
  });

  const phaseDate1 = (date) => {
    if (!date) return "Loading...";
    let tmp = date.split("-");
    return tmp[2] + "-" + tmp[1] + "-" + tmp[0];
  };
  const phaseDate2 = (perior) => {
    if (!perior) return "Loading...";
    let tmp = perior.split(" to ");
    return readableTime(tmp[0]) + " to " + readableTime(tmp[1]);
  };
  const phaseDate3 = (perior) => {
    if (!perior) return "Loading...";
    let tmp = perior.split(" - ");
    return readableTime(tmp[0]) + " to " + readableTime(tmp[1]);
  };

  //Transaction Table
  const columns = [
    {
      name: "Id",
      sortable: false,
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700 }}>{row.id}</div>
          {phaseDate2(row.perior) === titleProgress ? (
            <span style={{ fontWeight: 600, color: "darkorange" }}>
              In-perior
            </span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      name: "Date",
      sortable: false,
      right: true,
      cell: (row) => <div>{phaseDate1(row.date)}</div>,
    },
    {
      name: "Perior",
      sortable: false,
      right: true,
      cell: (row) => <div>{phaseDate2(row.perior)}</div>,
    },
    {
      name: "Reason",
      sortable: false,
      right: true,
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: "Amount of Transaction",
      sortable: false,
      right: true,
      cell: (row) => <div style={{ fontWeight: 800 }}>{row.amount}</div>,
    },
    {
      name: "TYPE",
      sortable: false,
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
          <button
            className="btn btn-primary m-1"
            onClick={() => handleViewTransaction(row.id)}
          >
            View
          </button>
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

  //Get main data
  useEffect(() => {
    if (authContext.isLoggedIn) {
      async function fetchData1() {
        const res = await fetch(GET_EACH_WALLET_API + choosenWallet, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            JWT: authContext.token,
          },
          method: "POST",
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
            "Access-Control-Allow-Origin": "*",
            JWT: authContext.token,
          },
          //credentials: "include",
          method: "POST",
        });

        res
          .json()
          .then((response) => setTransactions(response))
          .catch((err) => {});
      }

      fetchData1();
      fetchData2();
      return function cleanup() {
        setTransactionsUpdated(false);
      };
    }
  }, [transactionsUpdated, choosenWallet, walletHistory, authContext]);

  //Get history data
  useEffect(() => {
    if (authContext.isLoggedIn) {
      async function fetchData() {
        const res = await fetch(GET_WALLET_HISTORY + choosenWallet, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            JWT: authContext.token,
          },
          method: "POST",
        });

        res
          .json()
          .then((response) => setWalletHistory(response))
          .catch((err) => {});
      }

      fetchData();
      return function cleanup() {
        setTransactionsUpdated(false);
      };
    }
  }, [transactionsUpdated, choosenWallet, authContext]);

  //Get current perior
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(GET_CURRENT_PERIOR_API + choosenWallet, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          JWT: authContext.token,
        },
        method: "POST",
      });

      res
        .json()
        .then((response) => {
          setPeriorProgress(response.progress);
          setTitleProgress(
            phaseDate3(response.periorStart + " - " + response.periorEnd)
          );
          setTotalUsed({
            used: response.used,
            accident: response.accident,
            income: response.income,
            save: response.predictSave,
          });
        })
        .catch((err) => {});
    }

    fetchData();
    return function cleanup() {
      setTransactionsUpdated(false);
    };
  }, [transactionsUpdated, wallet?.perior, choosenWallet, authContext]);

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
          " <option value='4'>3 - Income (+)</option>" +
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
        await fetch(ADD_TRANSACTION_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            JWT: authContext.token,
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            walletId: choosenWallet,
            title: typedData.title,
            type: typedData.type,
            amount: typedData.amount,
            date: typedData.date,
            perior: wallet?.perior,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setTransactionsUpdated(true);
            Swal.fire({
              title: response.result,
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
      if (swal.isConfirmed) fetchData();
    };
    newTransaction();
  };

  //Delete transaction
  const handleDeleteTransaction = (id) => {
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
        }
      });

      async function fetchData() {
        await fetch(DELETE_TRANSACTION_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            JWT: authContext.token,
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            transactionId: id,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setTransactionsUpdated(true);
            Swal.fire({
              title: response.result,
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
    };
    deleteTransaction();
  };

  //View details transaction
  const handleViewTransaction = () => {};

  //Render
  return (
    <>
      {authContext.isLoggedIn ? (
        <div>
          <Greetings
            user={user}
            wallet={wallet}
            choosenWallet={choosenWallet}
          />
          <WalletDetails
            wallet={wallet}
            titleProgress={titleProgress}
            periorProgress={periorProgress}
            user={user}
          />

          <DataTable
            title="Current Month (Perior)"
            columns={current_month_columns}
            data={[
              {
                total: wallet?.actualData,
                used: totalUsed.used + " / " + wallet?.targetData.split("|")[0],
                remain: wallet?.targetData.split("|")[0] - totalUsed.used,
                accident:
                  totalUsed.accident + " / " + wallet?.targetData.split("|")[1],
                save: totalUsed.save + " / " + wallet?.targetData.split("|")[2],
              },
            ]}
          />

          <section id="history-section">
            <DataTable
              pagination="true"
              paginationPerPage={4}
              paginationRowsPerPageOptions={[4, 10, 30, 100]}
              title={
                <h2 style={{ float: "left", width: "fit-content" }}>History</h2>
              }
              columns={history_columns}
              data={walletHistory}
            />
          </section>

          <section id="transaction-section">
            <DataTable
              pagination="true"
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 50, 100, 500]}
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
                      onClick={() => handleNewTransaction()}
                    >
                      New transaction
                    </button>
                  </div>
                </div>
              }
              columns={columns}
              data={transactions}
              onRowClicked={(e) => handleViewTransaction(e)}
            />
          </section>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Transaction;
