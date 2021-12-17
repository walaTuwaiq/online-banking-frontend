import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import Receipt from './Receipt';

export default function TransferMoney() {
    const [toInput, setToInput] = useState("")
    const [amountInput, setAmountInput] = useState(0)
    const [ibanCards, setIbanCards] = useState([])
    const [resultSearch, setResultSearch] = useState([])
    const [ibanNumber, setIbanNumber] = useState(0)
    const [currentUserBalance, setCurrentUserBalance] = useState(0)
    const [currentUserIban, setCurrentUserIban] = useState(0)
    const [toggle, setToggle] = useState(false)

    const token = useSelector((state) => state.token.token);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {
        const getIbans = async()=>{
            const response = await axios.get("http://localhost:5000/iban-cards")

            setIbanCards(response.data)
            // console.log(response.data);
            // right data. array of objects
        }
        getIbans()
    }, [])

    const saveSearch = (e)=>{
        setIbanNumber(e.target.value)
    }

    const findIbanBySearch = ()=>{
        const result = ibanCards.filter((elem,index)=>{
            return elem.ibanNumber == ibanNumber
        })
        console.log(result,"result");
        // empty array

        setResultSearch(result)
    }

    const saveToInput = (id)=>{
        setToInput(id)
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
        if(response.status === 201){
            setToggle(true)
            setCurrentUserBalance(Number(response.data.balance))
            setCurrentUserIban(Number(response.data.ibanNumber))
        }
        console.log(response.data, "DONE");
    }

    return (
        <div>
            <div>
            {console.log(ibanCards,"ibanCards")}
            {console.log(toInput,"toInput")}
            {console.log(amountInput,"amountInput")}
            {console.log(ibanNumber,"ibanNumber")}
            {console.log(resultSearch,"resultSearch")}


            {
                toggle? <Receipt toInput={toInput} amount={Number(amountInput)} ibanNumber={ibanNumber} currentUserBalance={currentUserBalance} currentUserIban={currentUserIban} /> 
                :
                 <div>
                    
                    <h3>Current date is {date}</h3>
                    <input type="text" onChange={saveSearch}/>
                    <button onClick={()=>{findIbanBySearch()}}>Search</button>
                    
                    {
                        resultSearch && resultSearch.map((elem,index)=>{
                            return <div key={index}>
                                {
                                    elem.ibanNumber? <p onClick={()=>{saveToInput(elem._id)}}>{elem.ibanNumber}</p> : <p>CCC</p>
                                }
                                
                            </div>
                        })
                    }

                    {/* <label>To: </label> <input onChange={saveToInput} type="text" placeholder='To'/> */}
                    <label>The amount: </label> <input onChange={saveAmountInput} type="number" placeholder='amount'/>
                    <button onClick={()=>{submitTransaction()}}>Transfer</button>
                </div>
            }

            </div>
        </div>
    )
}
