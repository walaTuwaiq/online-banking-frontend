import React from "react";
import "../../styles/Footer.css";
import Whatsapp from "../../media/whatsapp.png";
import twitter from "../../media/twitter.png";
import linkedin from "../../media/linkedin.png";
import WR from "../../media/wala.png";

export default function Footer() {
  return (
    <div className="footer-div">
      <ul>
        <div>
          <h4>Contact us:</h4>
          <div className="icons-container">
            <li className="list-item-footer">
              <a
                href="https://twitter.com/Walaradi_4"
                target="_blank"
                className="a-item-footer"
              >
                <img
                  className="footer-icon"
                  src={twitter}
                  alt="Twitter"
                  title="Twitter"
                />
              </a>
            </li>
            <li className="list-item-footer">
              <a
                href="https://wa.me/00966543422291"
                target="_blank"
                className="a-item-footer"
              >
                <img
                  className="footer-icon"
                  src={Whatsapp}
                  alt="whatsapp"
                  title="whatsapp"
                />
              </a>
            </li>
            <li className="list-item-footer">
              <a
                href="https://www.linkedin.com/in/walaradi"
                target="_blank"
                className="a-item-footer"
              >
                <img
                  className="footer-icon"
                  src={linkedin}
                  alt="linkedin"
                  title="linkedin"
                />
              </a>
            </li>
          </div>
        </div>
        <li className="made-by">
          <p>Made By:</p>
          <a
            href="https://github.com/walaTuwaiq?tab=repositories"
            target="_blank"
          >
            <img
              className="wala-logo"
              title="GitHub"
              src={WR}
              alt="wala-logo"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
