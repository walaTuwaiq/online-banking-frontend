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
      const response = await axios.get(`${process.env.URL}/user-data`, {
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
        `${process.env.URL}/update-data`,
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
    <div>
      {userData.user ? (
        toggle ? (
          <div>
            <input
              type="text"
              placeholder="user name"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateData();
              }}
            >
              Save Changes
            </button>
            {errorMessage}
          </div>
        ) : (
          <div>
            <p>fullName: {userData.user.fullName}</p>
            <p>userName: {userName}</p>
            <p>dateOfBirth: {userData.user.dateOfBirth}</p>
            <p>lastSeen: {userData.user.lastSeen}</p>
            <p>nationalId: {userData.user.nationalId}</p>
            <button
              onClick={() => {
                changeToggle();
              }}
            >
              Change user
            </button>
          </div>
        )
      ) : (
        ""
      )}

      {userData.userCards
        ? userData.userCards.map((elem, index) => {
            return (
              <div key={index}>
                <p>balance: {elem.balance}SR</p>
                <p>ibanNumber: SA{elem.ibanNumber}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}
