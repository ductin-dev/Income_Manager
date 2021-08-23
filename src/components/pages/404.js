import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
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
          <p
            style={{
              padding: "18px 5px 18px 5px",
              fontWeight: 700,
              fontSize: 50,
            }}
          >
            404 - Page not found !
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
          <p
            style={{
              padding: "18px 5px 18px 5px",
              fontWeight: 700,
            }}
          >
            The page you looking for not found on this server, or your don't
            have enought permission to see
            <br></br>
            <Link style={{ fontWeight: 700, display: "block" }} to="/">
              Go Home
            </Link>
            <img
              style={{ marginTop: 28, borderRadius: 8 }}
              src="https://www.pngitem.com/pimgs/m/255-2550411_404-error-images-free-png-transparent-png.png"
              className="img-fluid"
              alt="Beautiful"
            ></img>
          </p>
        </div>
      </div>
    </>
  </div>
);

export default NotFound;
