import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../reducers/token";

export default function NavBar() {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch()

  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <Link className="navbar-link">
          <li className="navbar-item">LOGO</li>
        </Link>
        <Link to="/home" className="navbar-link">
          <li className="navbar-item">Home</li>
        </Link>
        <Link to="about-us" className="navbar-link">
          <li className="navbar-item">About</li>
        </Link>
        {
            token? <Link to="/" onClick={()=>{
                dispatch(setToken("","",""))
                localStorage.setItem("token","")
            }}>Log out</Link>
            :
            <Link to="/login" className="navbar-link">
            <li className="navbar-item">Log in</li>
            </Link>
        }
        {
            token? "" 
            : 
            <Link to="/signup" className="navbar-link">
            <li className="navbar-item">Sign up</li>
            </Link>
        }
        
      </ul>
    </div>
  );
}
