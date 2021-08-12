import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Redirect } from "react-router-dom";

import Swal from "sweetalert2";

import Constant from "../common/DomainConstant";

const URI = Constant;

const GET_WALLET_API = URI + "api/wallet/show/all";
const ADD_WALLET_API = URI + "api/wallet/add";
const DELETE_WALLET_API = URI + "api/wallet/delete";

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
  {
    name: "Action",
    sortable: false,
    right: true,
    cell: (row) => (
      <div>
        <button
          className="btn btn-primary m-1"
          onClick={(e) => this.rowClickedHandler(e)}
        >
          View
        </button>
        <button
          className="btn btn-danger m-1"
          onClick={() => handleDeleteWallet(row.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

//Delete transaction
const handleDeleteWallet = (e) => {
  const deleteWallet = async () => {
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
        Swal.fire("Deleted!", "Your Wallet has been deleted.", "success");
      }
    });

    async function fetchData() {
      const res = await fetch(DELETE_WALLET_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //credentials: "include",
        method: "POST",
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          walletId: e,
        }),
      });

      res
        .json()
        .then((response) => {})
        .catch((err) => {});
    }
  };
  deleteWallet();
};

const Wallet = (props) => {
  const [user] = useState(props.location.state?.user);
  const [isLogged, setIsLogged] = useState(true);
  const [wallets, setWallets] = useState();
  const [choosenWallet, setChoosenWallet] = useState(null);

  //Auth
  useEffect(() => {
    setIsLogged(
      user === null || user === [] || typeof user === "undefined" ? false : true
    );
  }, [user, isLogged]);

  //Get wallet list
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

  //Add wallet
  const handleNewWallet = () => {
    const newWallet = async () => {
      const swal = await Swal.fire({
        title: "Add wallet",
        icon: "info",
        html:
          '<div class="form-group">' +
          '<label for="wallet_target_used">Target Used</label>' +
          '<input type="text" class="form-control" id="wallet_target_used" placeholder="ex: 50.000">' +
          "</div>" +
          '<div class="form-group">' +
          '<label for="wallet_target_acc">Target Accident</label>' +
          '<input type="text" class="form-control" id="wallet_target_acc" placeholder="ex: 50.000">' +
          "</div>" +
          '<div class="form-group">' +
          '<label for="wallet_target_save">Target Save</label>' +
          '<input type="text" class="form-control" id="wallet_target_save" placeholder="ex: 50.000">' +
          "</div>" +
          '<div class="form-group">' +
          '<label for="wallet_target_income">Target Income</label>' +
          '<input type="text" class="form-control" id="wallet_target_income" placeholder="ex: 50.000">' +
          "</div>" +
          '<div class="form-group">' +
          '<label for="wallet_perior">Perior Date</label>' +
          '<input type="text" class="form-control" id="wallet_perior" placeholder="ex: 19">' +
          "</div>",
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        focusConfirm: false,
        preConfirm: () => ({
          used: document.getElementById("wallet_target_used").value,
          accident: document.getElementById("wallet_target_acc").value,
          save: document.getElementById("wallet_target_save").value,
          income: document.getElementById("wallet_target_income").value,
          perior: document.getElementById("wallet_perior").value,
        }),
      });
      let typedData = (swal && swal.value) || swal.dismiss;

      async function fetchData() {
        const res = await fetch(ADD_WALLET_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            used: typedData.used,
            accident: typedData.accident,
            save: typedData.save,
            income: typedData.income,
            perior: typedData.perior,
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
          .catch(() => {});
      }
      fetchData();
    };
    newWallet();
  };

  const rowClickedHandler = (e) => {
    setChoosenWallet(e.id);
  };

  return (
    <>
      {isLogged ? (
        <div>
          <h1>Welcome {user}, here your Wallets</h1>
          <DataTable
            title={
              <div className="row">
                <h2 style={{ float: "left", width: "fit-content" }}>
                  Wallet List
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
                    onClick={(e) => handleNewWallet()}
                  >
                    New wallet
                  </button>
                </div>
              </div>
            }
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
