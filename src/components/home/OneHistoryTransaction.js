import React, {useState, useEffect} from 'react'
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

export default function OneHistoryTransaction() {
const [historyUser, setHistoryUser] = useState([]);
  const {id} = useParams();
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getHistoryData = async () => {
      const response = await axios.get(
        `/full-data-transaction/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setHistoryUser(response.data);
    //   console.log(response.data);
    };

    if (token) {
      getHistoryData();
    }
  }, [token]);

  return <div>
      {<div className='history-data'>
          {
            //   console.log(historyUser)
          }
          <h3>transactionsUser</h3>
          <p>from: {historyUser.from}</p>
          <p>to: {historyUser.to}</p>
          <p>date: {historyUser.date}</p>
          <p>amount: {historyUser.amount}</p>
          {/* <p>SA{historyUser.cardId.ibanNumber}</p> */}
          {historyUser.cardId? <p>SA{historyUser.cardId.ibanNumber}</p> :""}
      </div>
      }
  </div>;

}
