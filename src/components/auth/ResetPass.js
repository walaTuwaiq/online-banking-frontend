import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ResetPass() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [passToggle, setPassToggle] = useState(false);
  const [firstPass, setFirstPass] = useState("");
  const [secondPass, setSecondPass] = useState("");

  const history = useHistory();

  const checkEmail = async () => {
    if (email !== "") {
      const response = await axios.post(`${process.env.REACT_APP_URL}/check-email`, {
        email,
      });
      if (response.status == 200) {
        const sendCode = await axios.post(`${process.env.REACT_APP_URL}/msg`, {
          email,
        });
        setToggle(!toggle);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data);
      }
    } else {
      setErrorMessage("Enter Email");
    }
  };

  const checkCode = async () => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/check-msg`, {
      email,
      code,
    });
    if (response.status == 200) {
      setPassToggle(!passToggle);
      setCode("");
    }
  };

  const saveFirstPass = (e) => {
    setFirstPass(e.target.value);
  };

  const saveSecondPass = (e) => {
    setSecondPass(e.target.value);
  };

  const resetPass = async () => {
    console.log(firstPass, "firstPass");
    console.log(secondPass, "secondPass");
    if (firstPass == secondPass) {
      const response = await axios.put(`${process.env.REACT_APP_URL}/re-pass`, {
        password: firstPass,
        email: email,
      });
      console.log(response, "response");
      if (response.status == 200) {
        setErrorMessage("");
        history.push("/login");
      }
    } else {
      setErrorMessage("Enter same password");
    }
  };

  return (
    <div>
      {passToggle ? (
        <div>
          <input
            type="password"
            value={firstPass}
            placeholder="Enter Password"
            onChange={(e) => {
              setFirstPass(e.target.value);
            }}
          />
          {firstPass}firstPass
          <input
            type="password"
            value={secondPass}
            placeholder="Repeat Password"
            onChange={(e) => {
              setSecondPass(e.target.value);
            }}
          />
          {secondPass}secondPass
          <button
            onClick={() => {
              resetPass();
            }}
          >
            RESET
          </button>
          {errorMessage}
        </div>
      ) : (
        <div>
          <label>Email: </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email"
          />
          <button
            onClick={() => {
              checkEmail();
            }}
          >
            Send Code To Email
          </button>
          {toggle && (
            <div>
              <label>Check Email And Enter Code: </label>
              <input
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                type="text"
                placeholder="CODE"
              />
              <button
                onClick={() => {
                  checkCode();
                }}
              >
                RESET PASSWORD
              </button>
            </div>
          )}
          {errorMessage}
        </div>
      )}
    </div>
  );
}
