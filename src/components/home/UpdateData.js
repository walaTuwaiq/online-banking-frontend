import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateData() {
  const [userData, setUserData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_URL}/user-data`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setUserName(response.data.user.userName);
    };

    if (token) {
      getData();
    }
  }, [token]);

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const updateData = async () => {
    if (userInput !== "") {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/update-data`,
        {
          userName: userInput,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserName(response.data.user.userName);
        setUserData(response.data);
        setToggle(!toggle);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please enter new user name!");
    }
  };

  return (
    <div className="add-money">
      {userData.user ? (
        toggle ? (
          <div>
            <br/>
            <input
              type="text"
              placeholder="new user name"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            <br/>
            <button
              onClick={() => {
                updateData();
              }}
            >
              Save Changes
            </button>
            <br/>
            {errorMessage}
          </div>
        ) : (
          <div>
            <p><b>fullName: </b>{userData.user.fullName}</p>
            <p><b>userName: </b>{userName}</p>
            <button
              onClick={() => {
                changeToggle();
              }}
            >
              Change user name
            </button>
            <p><b>Date Of Birth: </b>{userData.user.dateOfBirth}</p>
            <p><b>National Id: </b>{userData.user.nationalId}</p>
          </div>
        )
      ) : (
        ""
      )}

      {userData.userCards
        ? userData.userCards.map((elem, index) => {
            return (
              <div key={index}>
                <p><b>Balance: </b>{elem.balance}SR</p>
                <p><b>Iban Number: </b>SA{elem.ibanNumber}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}
