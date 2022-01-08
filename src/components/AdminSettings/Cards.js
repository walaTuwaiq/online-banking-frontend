import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/AdminPage.css";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [sumBalance, setSumBalance] = useState(0);
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/cards`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          setCards(response.data);
          let cardsArray = response.data;
          let balance = 0;
          for (let i = 0; i < cardsArray.length; i++) {
            balance += response.data[i].balance;
          }
          setSumBalance(balance);
        }
      } catch (error) {
        console.log(error.response.data, " error");
      }
    };

    if (token) {
      getCards();
    }
  }, [token]);
  return (
    <div className="cards-admin">
      <h3>Bank Liquidity:</h3>
      <h4>{sumBalance}SR</h4>

      <hr />
      <br />

      <div className="cards-container-admin">
        {cards &&
          cards.map((elem, index) => {
            return (
              <div key={index}>
                <p>Iban number: SA{elem.ibanNumber}</p>
                <p>Balance: {elem.balance}SR</p>
                {elem.isAcitve && <p>isActive: {elem.isActive.toString()}</p>}
                <p>Expired date: {elem.expiredDate.substr(0, 10)}</p>
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
}
