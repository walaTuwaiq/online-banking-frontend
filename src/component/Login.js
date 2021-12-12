import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory();

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
        history.push("/home");
      } catch (error) {
        console.log(error);
      }
    } else{
        setErrorMessage("please fill inputs")
    }
  };

  return (
    <div>
      <div>
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
        {errorMessage}
      </div>
    </div>
  );
}
