import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../services/Auth";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import Constant from "../common/DomainConstant";

const URI = Constant;

const GET_WALLET_API = URI + "api/wallet/show/all";
const ADD_WALLET_API = URI + "api/wallet/add";
const DELETE_WALLET_API = URI + "api/wallet/delete";

const Wallet = (props) => {
  const [wallets, setWallets] = useState();
  const [walletsUpdated, setWalletsUpdated] = useState(false);

  const [choosenWallet, setChoosenWallet] = useState(null);

  //Auth
  const authContext = useContext(AuthContext);

  //Get wallet list
  useEffect(() => {
    if (authContext.isLoggedIn) {
      async function fetchData() {
        const res = await fetch(GET_WALLET_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            JWT: authContext.token,
          },
          //credentials: "include",
          method: "POST",
        });

        res
          .json()
          .then((response) => setWallets(response))
          .catch((err) => {});
      }
      fetchData();

      return function cleanup() {
        setWalletsUpdated(false);
      };
    }
  }, [walletsUpdated, authContext]);

  //Add wallet
  const handleNewWallet = () => {
    const newWallet = async () => {
      const swal = await Swal.fire({
        title: "Add wallet",
        icon: "info",
        html:
          '<div class="form-group">' +
          '<label for="wallet_name">Wallet Name</label>' +
          '<input type="text" class="form-control" id="wallet_name">' +
          "</div>" +
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
          name: document.getElementById("wallet_name").value,
          used: document.getElementById("wallet_target_used").value,
          accident: document.getElementById("wallet_target_acc").value,
          save: document.getElementById("wallet_target_save").value,
          income: document.getElementById("wallet_target_income").value,
          perior: document.getElementById("wallet_perior").value,
        }),
      });

      let typedData = (swal && swal.value) || swal.dismiss;

      async function fetchData() {
        await fetch(ADD_WALLET_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            JWT: authContext.token,
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            name: typedData.name,
            used: typedData.used,
            accident: typedData.accident,
            save: typedData.save,
            income: typedData.income,
            perior: typedData.perior,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setWalletsUpdated(true);
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
          .catch(() => {});
      }

      if (swal.isConfirmed) fetchData();
    };

    newWallet();
  };

  //Delete wallet
  const handleDeleteWallet = (id) => {
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
        }
      });

      async function fetchData() {
        await fetch(DELETE_WALLET_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            JWT: authContext.token,
          },
          //credentials: "include",
          method: "POST",
          body: JSON.stringify({
            walletId: id,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setWalletsUpdated(true);
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
          .catch(() => {});
      }
    };
    deleteWallet();
  };

  //View wallet
  const handleViewWallet = (id) => {
    setChoosenWallet(id);
  };

  //Column wallet
  const columns = [
    {
      name: "Id",
      sortable: false,
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: "darkorange" }}>{row.name}</div>
          id: {row.id}
          <span style={{ fontWeight: 700, display: "block" }}>
            Monthly renew date: {row.perior}
          </span>
        </div>
      ),
    },
    {
      name: "TOTAL",
      sortable: false,
      right: true,
      cell: (row) => (
        <div style={{ fontWeight: 800, color: "forestgreen" }}>
          {row.actualData}
        </div>
      ),
    },
    {
      name: "Target used / month",
      sortable: false,
      right: true,
      cell: (row) => (
        <div style={{ fontWeight: 800 }}>{row.targetData.split("|")[0]}</div>
      ),
    },
    {
      name: "Target Accident / month",
      sortable: false,
      right: true,
      cell: (row) => (
        <div style={{ fontWeight: 800, color: "red" }}>
          {row.targetData.split("|")[1]}
        </div>
      ),
    },
    {
      name: "Target Save / month",
      sortable: false,
      right: true,
      cell: (row) => (
        <div style={{ fontWeight: 800 }}>{row.targetData.split("|")[2]}</div>
      ),
    },
    {
      name: "Target Income / month",
      sortable: false,
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
            onClick={() => handleViewWallet(row.id)}
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

  return (
    <>
      {authContext.isLoggedIn === true ? (
        <div>
          <h1>
            Welcome {JSON.parse(authContext.authUser)?.uName}, here your Wallets
          </h1>
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
            onRowClicked={(e) => handleViewWallet(e.id)}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
      {choosenWallet !== null ? (
        <Redirect
          to={{
            pathname: "/wallet/" + choosenWallet,
            state: { choosenWallet: choosenWallet },
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Wallet;
