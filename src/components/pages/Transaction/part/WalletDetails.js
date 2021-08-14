import styles from "../../../style/ProgressBar.module.css";
import textstyles from "../../../style/InfoText.module.css";

const WalletDetails = (props) => (
  <>
    <div className="row mt-2">
      <div className="col-5">
        <div className="card">
          <div className="card-body">
            <h5
              className={textstyles.display_text}
              style={{ width: "fit-content" }}
            >
              {props.wallet?.name}
            </h5>
            <p className="card-text">
              personal wallet with id = {props.wallet?.id}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Owner&nbsp;
              <span className={textstyles.display_text}>{props.user}</span>
            </li>
            <li className="list-group-item">
              {" "}
              Banlance&nbsp;
              <span
                className={textstyles.display_text}
                style={{ backgroundColor: "forestgreen" }}
              >
                {props.wallet?.actualData}
              </span>
            </li>
          </ul>
          <div className="card-body">
            <a href="/wallets" className="btn btn-primary">
              Back to wallets list
            </a>
            <a href="#history-section" className="btn">
              Wallet's History
            </a>
            <a href="#transaction-section" className="btn">
              See Transaction
            </a>
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Perior</h5>
            <p className="card-text">
              your seft-set perior to define the money's life cycle for easier
              management
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {" "}
              Perior date monthly&nbsp;
              <span
                className={textstyles.display_text}
                style={{ backgroundColor: "darkgray" }}
              >
                {props.wallet?.perior}
              </span>
            </li>
            <li className="list-group-item"></li>
            <li className="list-group-item">
              Perior&nbsp;
              <span
                className={textstyles.display_text}
                style={{
                  background: "linear-gradient(to right, #9d50bb, #6e48aa)",
                }}
              >
                {props.titleProgress}
              </span>
              <div className={styles.progress}>
                <div
                  className={styles.progress_done}
                  style={{ width: props.periorProgress + "%" }}
                ></div>
                {Math.round(props.periorProgress)} % of perior
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);
export default WalletDetails;
