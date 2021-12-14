import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "../styles/HistoryBalance.css"


export default function HistoryBalance() {
    const [historyUser, setHistoryUser] = useState([])
    const token = useSelector((state) => state.token.token);
    const history = useHistory()

    useEffect(() => {
        const getHistoryData=async()=>{
            const response = await axios.get("http://localhost:5000/history",{
                headers: {
                    authorization: `Bearer ${token}`,
                  } 
            });
            
            setHistoryUser(response.data)
            console.log(response.data);
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
            {historyUser.paymentsUser? historyUser.paymentsUser.map((elem,index)=>{
                return <div className='history-data' key={index} onClick={()=>{goToFullDataOfPayment(elem._id)}}>
                    <h3>paymentsUser</h3>
                    <p>date: {elem.date}</p>
                    <p>amount: {elem.amount}</p>
                    {/* <p>SA{elem.cardId.ibanNumber}</p> */}
                </div>
            }) : ("")}
            {historyUser.transactionsUser? historyUser.transactionsUser.map((elem,index)=>{
                return <div className='history-data' key={index} onClick={()=>{goToFullDataOfTransaction(elem._id)}}>
                <h3>transactionsUser</h3>
                <p>date: {elem.date}</p>
                <p>amount: {elem.amount}</p>
                {/* <p>SA{elem.cardId.ibanNumber}</p> */}
            </div>
            }) : ""}
        </div>
    )
}
