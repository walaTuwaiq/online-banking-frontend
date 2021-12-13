import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../styles/Login.css"
// import {useDispatch, useSelector} from "react-redux" 
import { useDispatch } from "react-redux";
import {setToken} from "../reducers/token"
// import {  } from "react-redux";

export default function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory();
  const dispatch = useDispatch()

  const saveUserName = (e) => {
    setUserName(e.target.value);
  };

  const savePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitDate = async () => {
    if (password !== "" && userName !== "") {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          userName,
          password,
        });
        console.log(response.data);
        if(response.status === 201){
          dispatch(setToken(response.data.token,response.data.payload.userId,response.data.payload.userName))
          localStorage.setItem("token", JSON.stringify(response.data.token))
          history.push("/home");
        } else{
          setErrorMessage(response.data)
          // console.log("RRR");
        }
      } catch (error) {
        console.log(error);
      }
    } else{
        setErrorMessage("please fill inputs")
    }
  };

  return (
    <div>
      <div className="login-form">
        <label htmlFor="">user name:</label>
        <input
          className="signup-input"
          type="text"
          placeholder="user name"
          onChange={saveUserName}
        />

        <label htmlFor="">password:</label>
        <input
          className="signup-input"
          type="password"
          placeholder="password"
          onChange={savePassword}
        />

        <button
          onClick={() => {
            submitDate();
          }}
        >
          Log in
        </button>

        <p className="error-message">
          {errorMessage+" "}
        {errorMessage === "You're don't have an account."? <Link className="error-message-link" to="/signup">Sign up</Link> : ""}
        </p>
      </div>
    </div>
  );
}
