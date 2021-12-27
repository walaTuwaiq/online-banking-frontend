import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

export default function Verification(props) {
    const [code, setCode] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const history = useHistory()

    const email = props.email
     const userName = props.userName
     const fullName = props.fullName
     const password= props.password
     const dateOfBirth = props.dateOfBirth
     const nationalId = props.nationalId
     const nationality = props.nationality
    
    // useEffect(() => {
         
    // }, [props])

    console.log(props,"props");

    const insertCode = (e)=>{
        setCode(e.target.value)
    }

    const checkCode = async()=>{
        try {
            const response = await axios.post("/check-msg",{
                email,
                code
            })
        console.log(response.data,"response");
        if(response.status == 200){
            const createAccount = await axios.post("/signup", {
                email,
                userName,
                fullName,
                password,
                dateOfBirth,
                nationalId,
                nationality,
              });
              if(createAccount.status == 201){
                  history.push("/login")
                }
        }
            } catch (error) {
                setErrorMessage(error.response.data)
            }
    }

    return (
        <div>
            <label>Please check your Email and Enter your code:</label>
            <input onChange={insertCode} type="text" placeholder='Enter code' />
            <button onClick={()=>{checkCode()}}>Verification</button>
            {
                errorMessage
            }
        </div>
    )
}
