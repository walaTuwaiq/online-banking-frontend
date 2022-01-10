import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../reducers/token";
import logoBank from "../../media/logo-bank.png";
import menue from "../../media/menu.png";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const token = useSelector((state) => state.token.token);
  const isAdmin = useSelector((state) => state.token.user_admin);
  const dispatch = useDispatch();

  const showHideNav = () => {
    setToggle(!toggle);
  };

  return (
    <div className="navbar-container">
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          id="check"
        />
        <label
          className="label-check"
          htmlFor="check"
          onClick={() => {
            setChecked(!checked);
          }}
        >
          <img src={menue} alt="menu" />
        </label>
      </div>

      {token ? (
        <Link to="/home">
          <img
            alt="LOGO"
            className="logo-nav"
            title="Alfaiadh"
            onClick={() => {
              setChecked(false);
            }}
            src={logoBank}
          />
        </Link>
      ) : (
        <Link to="/">
          <img
            alt="LOGO"
            className="logo-nav"
            title="Alfaiadh"
            onClick={() => {
              setChecked(false);
            }}
            src={logoBank}
          />
        </Link>
      )}

      <ul className={checked ? "navbar-listTrue navbar-list" : "navbar-list"}>
        <div className="leftside-nav">
          {token ? (
            isAdmin ? (
              ""
            ) : (
              <li className="navbar-item">
                <Link
                  to="/home"
                  className="navbar-link"
                  onClick={() => {
                    setChecked(false);
                  }}
                >
                  Home
                </Link>
              </li>
            )
          ) : (
            ""
          )}

          <li className="navbar-item">
            <Link
              to="/about-us"
              className="navbar-link"
              onClick={() => {
                setChecked(false);
              }}
            >
              About
            </Link>
          </li>

          {isAdmin && (
            <li className="navbar-item">
              <Link
                to="/admin-page"
                className="navbar-link"
                onClick={() => {
                  setChecked(false);
                }}
              >
                Admin Page
              </Link>
            </li>
          )}

          {token && (
            <li className="navbar-item">
              <Link
                to="/currency-today"
                className="navbar-link"
                onClick={() => {
                  setChecked(false);
                }}
              >
                Exchange Rates
              </Link>
            </li>
          )}
        </div>

        <div className="auth-container">
          {token ? (
            <li className="navbar-item">
              <Link
                to="/"
                className="navbar-link"
                onClick={() => {
                  dispatch(setToken("", ""));
                  localStorage.setItem("token", "");
                  localStorage.setItem("admin", "");
                  setChecked(false);
                }}
              >
                Log out
              </Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link
                to="/login"
                className="navbar-link"
                onClick={() => {
                  setChecked(false);
                }}
              >
                Log in
              </Link>
            </li>
          )}
          {token ? (
            ""
          ) : (
            <li className="navbar-item">
              <Link
                to="/signup"
                className="navbar-link"
                onClick={() => {
                  setChecked(false);
                }}
              >
                Sign up
              </Link>
            </li>
          )}
        </div>
        
      </ul>
    </div>
  );
}
