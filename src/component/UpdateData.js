import axios from "axios";
import React, { useEffect, useState } from "react";
// import token from '../reducers/token'
import { useSelector } from "react-redux";

export default function UpdateData() {
  const [userData, setUserData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userName, setUserName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/user-data", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setUserName(response.data.user.userName)
    };

    if (token) {
      getData();
    }
  }, [token]);

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const updateData = async (e) => {
    if(userInput !== ""){
      const response = await axios.put(
            "http://localhost:5000/update-data",
            {
              userName: userInput,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          
          if (response.status === 201) {
            //it's mean somthing about click button and refresh browser!
            // e.preventDefault();
            
            console.log(response.data);
            //   changeToggle();
            setUserData(response.data);
            setErrorMessage("")
          }
        } else{
        setErrorMessage("Please enter new user name!")
      }
  };

  const userNameInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      {userData.user ? console.log(userData) : console.log(userData.user)}
      
      {userData.user ? (
        toggle ? (
          <div>
            <input
              type="text"
              placeholder="user name"
              onChange={userNameInput}
            />
            <button
              onClick={(e) => {
                //It's work but not working like i want, must refresh browser to change user
                setToggle(!toggle)
                updateData(e);

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

      {console.log(userData.userCards)}

      {userData.userCards
        ? userData.userCards.map((elem, index) => {
            return (
              <div key={index}>
                <p>balance: {elem.balance}</p>
                <p>ibanNumber: {elem.ibanNumber}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}
