import React, {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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
    const [nationality, setNationality] = useState("")
    
    const history = useHistory()

    

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

    const saveNationality = (e)=>{
        setNationality(e.target.value)
    }

    const saveCheck = (e)=>{
        setCheck(e.target.checked)
    }

    const submitDate= async()=>{
        if(date!=="" && firstName !== "" && secondName !== "" && userName !=="" && password !== ""){
            if(check && nationalId.length === 10){
                try {
                    const response = await axios.post("http://localhost:5000/signup",{
                        userName,
                        fullName: `${firstName} ${secondName}`,
                        password,
                        dateOfBirth:date,
                        nationalId,
                        nationality,
                    })

                    if(response.status === 201){
                        history.push("/login")
                    } else{
                        setErrorMessage(response.data)
                        console.log(response.data);
                    }
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

                <label htmlFor="">nationality:</label>
                <select onChange={saveNationality} name="nationality">
                    <option value="">-- select one --</option>
                    <option value="afghan">Afghan</option>
                    <option value="american">American</option>
                    <option value="australian">Australian</option>
                    <option value="bahraini">Bahraini</option>
                    <option value="canadian">Canadian</option>
                    <option value="chinese">Chinese</option>
                    <option value="egyptian">Egyptian</option>
                    <option value="filipino">Filipino</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="indian">Indian</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="iraqi">Iraqi</option>
                    <option value="italian">Italian</option>
                    <option value="jordanian">Jordanian</option>
                    <option value="kazakhstani">Kazakhstani</option>
                    <option value="kenyan">Kenyan</option>
                    <option value="kuwaiti">Kuwaiti</option>
                    <option value="lebanese">Lebanese</option>
                    <option value="omani">Omani</option>
                    <option value="pakistani">Pakistani</option>
                    <option value="qatari">Qatari</option>
                    <option value="russian">Russian</option>
                    <option value="saudi">Saudi</option>
                    <option value="south african">South African</option>
                    <option value="spanish">Spanish</option>
                    <option value="sudanese">Sudanese</option>
                    <option value="syrian">Syrian</option>
                    <option value="turkish">Turkish</option>
                    <option value="yemenite">Yemenite</option>
                </select>

                {/* {nationality} */}
                {/* Selected right option */}

                <div className='policy'>
                    <input className='checkbox-input' type="checkbox" onChange={saveCheck}/>
                    I Agree to all privacy policy
                </div>
                    <button onClick={()=>{submitDate()}}>Sign up</button>
                
                <p className='error-message'>
                {errorMessage+" "}
                {
                    errorMessage === "You are already have account."? <Link className='error-message-link' to="/login">Log in</Link> : ""
                }
                </p>
            </div>
        </div>
    )
}
