import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Signup.css";

export default function Verification(props) {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const email = props.email;
  const userName = props.userName;
  const fullName = props.fullName;
  const password = props.password;
  const dateOfBirth = props.dateOfBirth;
  const nationalId = props.nationalId;
  const nationality = props.nationality;

  const checkCode = async () => {
    try {
      const response = await axios.post(`${process.env.HOST}/check-msg`, {
        email,
        code,
      });
      console.log(response.data, "response");
      if (response.status == 200) {
        const createAccount = await axios.post(`${process.env.HOST}/signup`, {
          email,
          userName,
          fullName,
          password,
          dateOfBirth,
          nationalId,
          nationality,
        });
        if (createAccount.status == 201) {
          history.push("/login");
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="verification">
      <label>Please check your Email and Enter your code:</label>
      <input
        onChange={(e) => {
          setCode(e.target.value);
        }}
        type="text"
        placeholder="Enter code"
      />
      <button
        onClick={() => {
          checkCode();
        }}
      >
        Verification
      </button>
      {errorMessage}
    </div>
  );
}
