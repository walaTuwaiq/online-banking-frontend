import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "../styles/HistoryBalance.css"


export default function HistoryBalance() {
    const [historyUser, setHistoryUser] = useState([])
    const [message, setMessage] = useState("DON'T HAVE HISTORY NUTILL NOW")
    const token = useSelector((state) => state.token.token);
    const history = useHistory()

    useEffect(() => {
        const getHistoryData=async()=>{
            const response = await axios.get("http://localhost:5000/history",{
                headers: {
                    authorization: `Bearer ${token}`,
                  } 
            });
            // console.log(response.data.paymentsUser,"response");
            // console.log(response.data.transactionsUser,"response2");
            // console.log(response.data.paymentsUser == true || response.data.transactionsUser == true, "true or false");
            // object with 2 keys, if don't have history these keys have empty array
            
            // to handling: show message if don't have history
            if(response.data.paymentsUser == true || response.data.transactionsUser == true ){
                setHistoryUser(response.data)
                // console.log(response.data.paymentsUser == true || response.data.transactionsUser == true, "TTT");
                setMessage("")
            }
        }

        if(token){
            getHistoryData()
        }
    }, [token])

    const goToFullDataOfPayment=(id)=>{
        history.push(`/full-data-payment/${id}`)
    }

    const goToFullDataOfTransaction=(id)=>{
        history.push(`/full-data-transaction/${id}`)
    }
    
    return (
        <div>
            {
                console.log(historyUser)
            }
            {
                historyUser.paymentsUser && historyUser.transactionsUser?
                    <div>
                        {historyUser.paymentsUser&& historyUser.paymentsUser.map((elem,index)=>{
                            return <div className='history-data' key={index} onClick={()=>{goToFullDataOfPayment(elem._id)}}>
                                <h3>paymentsUser</h3>
                                <p>date: {elem.date}</p>
                                <p>amount: {elem.amount}</p>
                                {/* <p>SA{elem.cardId.ibanNumber}</p> */}
                            </div>
                        })}
                        {historyUser.transactionsUser&& historyUser.transactionsUser.map((elem,index)=>{
                            return <div className='history-data' key={index} onClick={()=>{goToFullDataOfTransaction(elem._id)}}>
                            <h3>transactionsUser</h3>
                            <p>date: {elem.date}</p>
                            <p>amount: {elem.amount}</p>
                            {/* <p>SA{elem.cardId.ibanNumber}</p> */}
                        </div>
                        })}
                    </div>
                 :
                    <div>
                    </div>
            }
            <h3>{message}</h3>
        </div>
    )
}
