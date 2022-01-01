import React from "react";
import { Link } from "react-router-dom";
// import "../styles/NavBar.css";
import "../../styles/NavBar.css"
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../reducers/token";
import logoBank from "../../media/logo-bank.png"

export default function NavBar() {
  const token = useSelector((state) => state.token.token);
  const isAdmin = useSelector((state) => state.token.user_admin);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        {token ? (
          <li className="navbar-item">
              <Link to="/home" className="navbar-link">
              <img className="logo-nav" src={logoBank} />
          </Link>
            </li>
        ) : (
          <Link to="/" className="navbar-link">
            {/* <li className="navbar-item">LOGO</li> */}
            <img className="logo-nav" src={logoBank} />
          </Link>
        )}
        {token ? isAdmin? "" : (
          <li className="navbar-item">
              <Link to="/home" className="navbar-link">
            Home
          </Link>
            </li>
        ) : (
          ""
        )}

          <li className="navbar-item">
        <Link to="/about-us" className="navbar-link">
          About
        </Link>
          </li>

        {isAdmin && (
          <li className="navbar-item">
              <Link to="/admin-page" className="navbar-link">
            Admin Page
          </Link>
            </li>
        )}

        {token ? (
          <li className="navbar-item">
          <Link
            to="/"
            className="navbar-link"
            onClick={() => {
              dispatch(setToken("", ""));
              localStorage.setItem("token", "");
              localStorage.setItem("admin", "");
            }}
          >
            Log out
          </Link>
          </li>
        ) : (
          <li className="navbar-item">
              <Link to="/login" className="navbar-link">
            Log in
          </Link>
            </li>
        )}
        {token ? (
          ""
        ) : (
          <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
            Sign up
          </Link>
            </li>
        )}
      </ul>
    </div>
  );
}
