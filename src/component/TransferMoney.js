import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { useSelector } from "react-redux";

export default function TransferMoney() {
    const [toInput, setToInput] = useState("")
    const [amountInput, setAmountInput] = useState(0)
    const [ibanCards, setIbanCards] = useState([])
    const [resultSearch, setArrayResultSearch] = useState([])
    const [ibanNumber, setIbanNumber] = useState(0)
    const token = useSelector((state) => state.token.token);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {
        const getIbans = async()=>{
            const response = await axios.get("http://localhost:5000/iban-cards")

            setIbanCards(response.data)

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
        setArrayResultSearch(result)
    }

    const saveToInput = (id)=>{
        setToInput(id)
        console.log(id);
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
            {console.log(ibanCards,"ibanCards")}
            {console.log(toInput,"toInput")}
            {console.log(amountInput,"amountInput")}
            {console.log(ibanNumber,"ibanNumber")}
            {console.log(resultSearch,"resultSearch")}

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
        </div>
    )
}
