import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../styles/Login.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducers/token";
import logoBank from "../../media/logo-bank.png";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const saveEmail = (e) => {
    setEmail(e.target.value);
  };

  const savePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitDate = async () => {
    if (password !== "" && email !== "") {
      try {
        const response = await axios.post(`${process.env.HOST}/login`, {
          email,
          password,
        });
        if (response.status === 201) {
          dispatch(
            setToken(
              response.data.token,
              response.data.payload.isAdmin,
              response.data.payload.userId,
              response.data.payload.userName
            )
          );
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem(
            "admin",
            JSON.stringify(response.data.payload.isAdmin)
          );
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.payload.userId)
          );
          localStorage.setItem(
            "userName",
            JSON.stringify(response.data.payload.userName)
          );
          history.push("/home");
        } else {
          setErrorMessage(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage("please fill inputs");
    }
  };

  return (
    <div>
      <div className="login-form">
        <img className="logo-login" src={logoBank} />
        <label htmlFor="">Email:</label>
        <input
          className="login-input"
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="">password:</label>
        <input
          className="login-input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          onClick={() => {
            submitDate();
          }}
        >
          Log in
        </button>
        <p>
          <Link className="forget-pass" to="/forget-pass">
            Froget Password?
          </Link>
        </p>

        <p className="error-message">
          {errorMessage + " "}
          {errorMessage === "You're don't have an account." ? (
            <Link className="error-message-link" to="/signup">
              Sign up
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
}
