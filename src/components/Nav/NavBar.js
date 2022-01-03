import React,{useState} from "react";
import { Link } from "react-router-dom";
// import "../styles/NavBar.css";
import "../../styles/NavBar.css"
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../reducers/token";
import logoBank from "../../media/logo-bank.png"

export default function NavBar() {
  const [toggle, setToggle] = useState(false)
  const token = useSelector((state) => state.token.token);
  const isAdmin = useSelector((state) => state.token.user_admin);
  const dispatch = useDispatch();

  const showHideNav=()=>{
    setToggle(!toggle)
  }

  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        {token ? (
              <Link to="/home" className="navbar-link">
              <img className="logo-nav" title="Alfaiadh" src={logoBank} />
          </Link>
        ) : (
          <Link to="/" className="navbar-link">
            {/* <li className="navbar-item">LOGO</li> */}
            <img className="logo-nav" title="Alfaiadh" src={logoBank} />
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
        <div className="span-container" onClick={()=>{showHideNav()}}>
        <span className="span-navbar"></span>
        <span className="span-navbar"></span>
        <span className="span-navbar"></span>
        </div>

{/* {
  toggle && <div>

  </div>
} */}
      </ul>
    </div>
  );
}
