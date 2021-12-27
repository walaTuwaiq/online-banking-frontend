import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import "../styles/Login.css"
import "../../styles/Login.css"
// import {useDispatch, useSelector} from "react-redux" 
import { useDispatch } from "react-redux";
import {setToken} from "../../reducers/token"
// import {  } from "react-redux";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory();
  const dispatch = useDispatch()

  const saveEmail = (e) => {
    setEmail(e.target.value);
  };

  const savePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitDate = async () => {
    if (password !== "" && email !== "") {
      try {
        const response = await axios.post("/login", {
          email,
          password,
        });
        console.log(response.data, "login");
        if(response.status === 201){
          dispatch(setToken(response.data.token,response.data.payload.isAdmin))
          localStorage.setItem("token", JSON.stringify(response.data.token))
          localStorage.setItem("admin", JSON.stringify(response.data.payload.isAdmin))
          // console.log(response.data,"data log in");
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
        <label htmlFor="">Email:</label>
        <input
          className="signup-input"
          type="text"
          placeholder="email"
          onChange={saveEmail}
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
