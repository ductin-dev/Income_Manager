import React, { Component } from "react";

import textstyles from "../style/InfoText.module.css";
class Wallet extends Component {
  render() {
    return (
      <div className="container">
        <div
          className="col-12 mt-3"
          style={{
            borderRadius: 5,
            background: "linear-gradient(to right, #9d50bb, #6e48aa)",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ padding: "18px 5px 18px 5px" }}>
            tools developed by&nbsp;&nbsp;
            <span className={textstyles.display_text}>Tin</span>&nbsp;, made
            maney management more flexible and effective, minimizing unnecessary
            spending and long-term goals <br></br>more about me and&nbsp;&nbsp;
            <span className={textstyles.display_text}>SAT</span> _ visit my
            website:&nbsp;&nbsp;
            <a
              href="https://www.satdevelop.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "orange" }}
            >
              www.satdevelop.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Wallet;
