import axios from 'axios';
import React,{useState} from 'react'
import { useSelector } from "react-redux";
import Receipt from './Receipt';

export default function Payment() {
    const [toInput, setToInput] = useState("")
    const [amountInput, setAmountInput] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [currentUserBalance, setCurrentUserBalance] = useState(0)
    const [currentUserIban, setCurrentUserIban] = useState(0)
    
    const token = useSelector((state) => state.token.token);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    // useEffect(() => {
    //     const getIbans = async()=>{
    //         const response = await axios.get("/iban-cards")

    //         setIbanCards(response.data)

    //     }
    //     getIbans()
    // }, [])

    const saveToInput = (e)=>{
        setToInput(e.target.value)
        // console.log(id);
    }

    const saveAmountInput = (e)=>{
        setAmountInput(e.target.value)
    }

    const submitTransaction= async()=>{
        const response = await axios.post("/payment",{
            to: toInput,
            amount: Number(amountInput),
        },{
            headers: {
                authorization: `Bearer ${token}`,
              },
        })
        if(response.status === 201){
            setToggle(true)
            setCurrentUserBalance(Number(response.data.balance))
            setCurrentUserIban(Number(response.data.ibanNumber))
        }
        console.log(response.data);
    }

    return (
        <div>
            {
                toggle? <Receipt amount={Number(amountInput)} ibanNumber={toInput} currentUserBalance={currentUserBalance} currentUserIban={currentUserIban} />
                : 
                    <div>
                    <h3>Current date is {date}</h3>
        
                    {/* <label>To: </label> <input onChange={saveToInput} type="text" placeholder='To'/> */}
                    <label>The amount: </label> <input onChange={saveAmountInput} type="number" placeholder='amount'/>
                    <label>To: </label> <input onChange={saveToInput} type="number" placeholder='to'/>
                    <button onClick={()=>{submitTransaction()}}>Payment</button>
                    </div>
            }
            
        </div>
    )
}
