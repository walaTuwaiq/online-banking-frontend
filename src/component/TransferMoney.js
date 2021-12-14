import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { useSelector } from "react-redux";

export default function TransferMoney() {
    const [toInput, setToInput] = useState("")
    const [amountInput, setAmountInput] = useState(0)
    const [ibanCards, setIbanCards] = useState([])
    const token = useSelector((state) => state.token.token);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {
        const getIbans = async()=>{
            const response = await axios.get("http://localhost:5000/iban-cards")

            setIbanCards(response)
        }
        getIbans()
    }, [])

    const saveToInput = (e)=>{
        setToInput(e.target.value)
    }

    const saveAmountInput = (e)=>{
        setAmountInput(e.target.value)
    }

    const submitTransaction= async()=>{
        const response = await axios.post("http://localhost:5000/transaction",{
            to: toInput,
            amount: Number(amountInput),
        },{
            headers: {
                authorization: `Bearer ${token}`,
              },
        })
        console.log(response.data);
    }

    return (
        <div>
            <div>
            {console.log(ibanCards)}
            <h3>Current date is {date}</h3>
            <label>To: </label> <input onChange={saveToInput} type="text" placeholder='To'/>
            <label>The amount: </label> <input onChange={saveAmountInput} type="number" placeholder='amount'/>
            <button onClick={()=>{submitTransaction()}}>Transfer</button>
            </div>
        </div>
    )
}
