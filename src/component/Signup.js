import React, {useState} from 'react';
import "../styles/Signup.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [date, setDate] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [nationalId, setNationalId] = useState(0)
    const [check, setCheck] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const saveDate=(e)=>{
        setDate(e.target.value)
    }

    const saveUserName = (e)=>{
        setUserName(e.target.value)
    }

    const saveFirstName = (e)=>{
        setFirstName(e.target.value)
    }

    const saveSecondName = (e)=>{
        setSecondName(e.target.value)
    }

    const savePassword = (e)=>{
        setPassword(e.target.value)
    }

    const saveNationalId = (e)=>{
        setNationalId(e.target.value)
    }

    const saveCheck = (e)=>{
        setCheck(e.target.checked)
    }

    const submitDate= async()=>{
        if(date!=="" && firstName !== "" && secondName !== "" && userName !=="" && password !== ""){
            if(check && nationalId.length === 10){
                try {
                    await axios.post("http://localhost:5000/signup",{
                        userName,
                        fullName: `${firstName} ${secondName}`,
                        password,
                        dateOfBirth:date,
                        nationalId
                    })
                } catch (error) {
                    console.log(error);
                }
            } else{
                if(!check){
                    setErrorMessage("Accept our policy to continue")
                } else{
                    setErrorMessage("Enter correct national ID")
                }
            }
        } else {
            setErrorMessage("Please enter all of data!")
        }
    }

    return (
        <div>
            <div className='signup-form'>
                <label htmlFor="">user name:</label>
                <input className='signup-input' type="text" placeholder='user name' onChange={saveUserName} />

                <label htmlFor="">first name:</label>
                <input className='signup-input' type="text" placeholder='first name' onChange={saveFirstName} />

                <label htmlFor="">second name:</label>
                <input className='signup-input' type="text" placeholder='second name' onChange={saveSecondName} />

                <label htmlFor="">password:</label>
                <input className='signup-input' type="password" placeholder='password' onChange={savePassword} />
                
                <label htmlFor="">date of birth:</label>
                <input className='signup-input' type="date" onChange={saveDate}/>

                <label htmlFor="">national id:</label>
                <input className='signup-input' type="number" placeholder='national id' onChange={saveNationalId} />

                <div className='policy'>
                    <input className='checkbox-input' type="checkbox" onChange={saveCheck}/>
                    I Agree to all privacy policy
                </div>
                <Link to="/home">
                    <button onClick={()=>{submitDate()}}>Sign up</button>
                </Link>
                {console.log(typeof nationalId)}
                {console.log(firstName === "")}
                {console.log(typeof userName)}
                {errorMessage}
            </div>
        </div>
    )
}
