import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

export default function OneHistoryPayment() {
  const [historyUser, setHistoryUser] = useState([]);
  const { id } = useParams();
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getHistoryData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_URL}/full-data-payment/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setHistoryUser(response.data);
    };

    if (token) {
      getHistoryData();
    }
  }, [token]);

  return (
    <div>
      {
        <div className="history-data">
          <h3>paymentsUser</h3>
          <p>from: {historyUser.from}</p>
          <p>to: {historyUser.to}</p>
          <p>date: {historyUser.date}</p>
          <p>amount: {historyUser.amount}</p>
          {historyUser.cardId ? <p>SA{historyUser.cardId.ibanNumber}</p> : ""}
        </div>
      }
    </div>
  );
}
