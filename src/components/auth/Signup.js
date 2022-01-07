import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../styles/Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Verification from "./Verification";
import logoBank from "../../media/logo-bank.png";

import { validEmail, validPassword } from "./Regex";

export default function Signup() {
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [nationalId, setNationalId] = useState(0);
  const [check, setCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nationality, setNationality] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);

  const submitDate = async () => {
    if (!validEmail.test(email)) {
      setErrorMessage("Your email is invalid");
      return;
    }
    if (!validPassword.test(password)) {
      setErrorMessage("Your password is invalid");
      return;
    }
    if (
      date !== "" &&
      firstName !== "" &&
      email !== "" &&
      secondName !== "" &&
      userName !== "" &&
      password !== ""
    ) {
      if (check && nationalId.length === 10) {
        try {
          setLoadingToggle(true);
          const response = await axios.post(`${process.env.URL}/msg`, {
            email,
          });
          if (response.status === 201) {
            setToggle(!toggle);
          } else {
            setErrorMessage(response.data);
          }
        } catch (error) {
          console.log(error, "error");
        }
      } else {
        if (!check) {
          setErrorMessage("Accept our policy to continue");
        } else {
          setErrorMessage("Enter correct national ID");
        }
      }
    } else {
      setErrorMessage("Please enter all of data!");
    }
  };

  return (
    <div>
      {toggle ? (
        <div>
          <Verification
            email={email}
            userName={userName}
            fullName={`${firstName} ${secondName}`}
            password={password}
            dateOfBirth={date}
            nationalId={nationalId}
            nationality={nationality}
          />
        </div>
      ) : (
        <div className="login-form">
          <img className="logo-login" src={logoBank} />
          <label>Email:</label>
          <input
            className="login-input"
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label>user name:</label>
          <input
            className="login-input"
            type="text"
            placeholder="user name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <label>first name:</label>
          <input
            className="login-input"
            type="text"
            placeholder="first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <label>second name:</label>
          <input
            className="login-input"
            type="text"
            placeholder="second name"
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
          />

          <label>password:</label>
          <input
            className="login-input"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span className="pass-msg">
            <span>&#9733;</span> Must includes numbers and characters
          </span>

          <label>date of birth:</label>
          <input
            className="login-input date-of-birth"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <label>national id:</label>
          <input
            className="login-input"
            type="number"
            placeholder="national ID"
            onChange={(e) => {
              setNationalId(e.target.value);
            }}
          />

          <label>nationality:</label>
          <select
            className="select-nationality"
            onChange={(e) => {
              setNationality(e.target.value);
            }}
            name="nationality"
          >
            <option value="">-- select one --</option>
            <option value="afghan">Afghan</option>
            <option value="american">American</option>
            <option value="australian">Australian</option>
            <option value="bahraini">Bahraini</option>
            <option value="canadian">Canadian</option>
            <option value="chinese">Chinese</option>
            <option value="egyptian">Egyptian</option>
            <option value="filipino">Filipino</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="indian">Indian</option>
            <option value="indonesian">Indonesian</option>
            <option value="iraqi">Iraqi</option>
            <option value="italian">Italian</option>
            <option value="jordanian">Jordanian</option>
            <option value="kazakhstani">Kazakhstani</option>
            <option value="kenyan">Kenyan</option>
            <option value="kuwaiti">Kuwaiti</option>
            <option value="lebanese">Lebanese</option>
            <option value="omani">Omani</option>
            <option value="pakistani">Pakistani</option>
            <option value="qatari">Qatari</option>
            <option value="russian">Russian</option>
            <option value="saudi">Saudi</option>
            <option value="south african">South African</option>
            <option value="spanish">Spanish</option>
            <option value="sudanese">Sudanese</option>
            <option value="syrian">Syrian</option>
            <option value="turkish">Turkish</option>
            <option value="yemenite">Yemenite</option>
          </select>

          <div className="policy">
            <input
              type="checkbox"
              onChange={(e) => {
                setCheck(e.target.checked);
              }}
            />
            I Agree to all privacy policy
          </div>
          <button
            onClick={() => {
              submitDate();
            }}
          >
            Sign up
          </button>

          {loadingToggle && (
            <div className="loader loader--style3" title="2">
              <svg
                version="1.1"
                id="loader-1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 50 50"
              >
                <path
                  fill="#000"
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              <p>Loading...</p>
            </div>
          )}

          <p className="error-message">
            {errorMessage + " "}
            {errorMessage === "You are already have account." ? (
              <Link className="error-message-link" to="/login">
                Log in
              </Link>
            ) : (
              ""
            )}
          </p>
        </div>
      )}
    </div>
  );
}
