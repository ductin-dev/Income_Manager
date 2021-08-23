import React from "react";

import textstyles from "../style/InfoText.module.css";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-center text-white"
      style={{ marginTop: 88 }}
    >
      <div className="container-fluid p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com/satdevelop/"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <FiFacebook />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com/satfomacej/"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <FiInstagram />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/satellite1012/"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/đức-tín-2a296718a/"
            target="_blank"
            rel="noreferrer"
            role="button"
          >
            <FaLinkedinIn />
          </a>
        </section>

        <section className="mb-4">
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
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright:
        <a className="text-white" href="https://www.satdevelop.com/">
          satdevelop.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
