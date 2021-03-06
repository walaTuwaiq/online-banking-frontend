import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/ViewCard.css";
import { useSelector } from "react-redux";
import logo from "../../media/logo-bank.png"

export default function ViewCard() {
  const [userData, setUserData] = useState([]);
  const [userExpireDate, setUserExpireDate] = useState("");
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getUserCard = async () => {
      const response = await axios.get(`${process.env.REACT_APP_URL}/user-card`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // To show expired date in card
      const fullExpireDate = response.data.card[0].expiredDate.split("");
      let expireDate = [];
      for (let i = 0; i < 10; i++) {
        expireDate.push(fullExpireDate[i]);
      }
      setUserExpireDate(response.data.card[0].expiredDate.substr(0, 10));
      setUserData(response.data);
    };

    if (token) {
      getUserCard();
    }
  }, [token]);

  return (
    <div>
      <div className="floating">
        <div className="card_body">
          <div className="card-logo">
            <img src={logo} alt="logo"/>
          </div>
          {userData.card && (
            <div className="card_no text">{userData.card[0].ibanNumber}</div>
          )}
          {userData.user && (
            <div className="valid_date text">{userExpireDate}</div>
          )}
          {userData.user && (
            <div className="holder text">{userData.user.fullName}</div>
          )}

          <div className="mastercard_icon svg"></div>
        </div>
      </div>
    </div>
  );
}
