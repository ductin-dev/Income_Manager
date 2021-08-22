import React, { Component } from "react";

import textstyles from "../style/InfoText.module.css";
class Wallet extends Component {
  render() {
    return (
      <>
        <div
          style={{
            possition: "absoulute",
            backgroundImage:
              "url(https://i.pinimg.com/originals/f1/b4/d8/f1b4d8b97c237d3d03da0c5c32fa416b.jpg)",
          }}
        ></div>
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
              maney management more flexible and effective, minimizing
              unnecessary spending and long-term goals <br></br>more about me
              and&nbsp;&nbsp;
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
              May be you sould now ... React (also known as React.js or ReactJS)
              is a free and open-source front-end JavaScript library for
              building user interfaces or UI components. It is maintained by
              Facebook and a community of individual developers and companies.
              React can be used as a base in the development of single-page or
              mobile applications. However, React is only concerned with state
              management and rendering that state to the DOM, so creating React
              applications usually requires the use of additional libraries for
              routing, as well as certain client-side functionality.
              <img
                style={{ marginTop: 28, borderRadius: 8 }}
                src="https://img.freepik.com/free-vector/futuristic-night-city-background_52683-9062.jpg?size=626&ext=jpg"
                class="img-fluid"
                alt="Beautiful"
              ></img>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Wallet;
