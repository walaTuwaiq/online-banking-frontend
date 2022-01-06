import React from "react";
import "../../styles/Footer.css";
import WR from "../../media/wala.png";

export default function Footer() {
  return (
    <div className="footer-div">
      <ul>
        <h4>Contact us:</h4>
        <li className="list-item-footer">
          <a
            href="https://twitter.com/Walaradi_4"
            target="_blank"
            className="a-item-footer"
          >
            - Twitter
          </a>
        </li>
        <li className="list-item-footer">
          <a
            href="https://wa.me/00966543422291"
            target="_blank"
            className="a-item-footer"
          >
            - Whatsup
          </a>
        </li>
        <li className="made-by">
          <p>Made By:</p>
          <a
            href="https://github.com/walaTuwaiq?tab=repositories"
            target="_blank"
            rel="noopener"
          >
            <img className="wala-logo" title="GitHub" src={WR} />
          </a>
        </li>
      </ul>
    </div>
  );
}
