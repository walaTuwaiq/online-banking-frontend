import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/ViewCard.css";
import { useSelector } from "react-redux";

export default function ViewCard() {
    const [userData, setUserData] = useState([])
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getUserCard = async () => {
      const response = await axios.get("http://localhost:5000/user-card", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data)
    };

    if(token){
        getUserCard();
    }
  }, [token]);

  return (
    <div>
      <div className="floating">
        <div className="card_body">
          <div className="logo svg"></div>
          {
              userData.card && <div className="card_no text">{userData.card[0].ibanNumber}</div> 
          }
          {
              userData.user && <div className="valid_date text">{userData.user.dateOfBirth}</div> 
          }
          {
              userData.user && <div className="holder text">{userData.user.fullName}</div> 
          }
          
          <div className="mastercard_icon svg"></div>
        </div>
      </div>
    </div>
  );
}
