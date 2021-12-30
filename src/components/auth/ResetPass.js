import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

export default function ResetPass() {

    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [toggle, setToggle] = useState(false)
    const [passToggle, setPassToggle] = useState(false)
    const [firstPass, setFirstPass] = useState("")
    const [secondPass, setSecondPass] = useState("")

    const history = useHistory()

    const saveEmail = (e)=>{
        setEmail(e.target.value)
    }

    const saveCode = (e)=>{
        setCode(e.target.value)
    }

    const checkEmail = async()=>{
        if(email !== ""){
            const response = await axios.post("/check-email",{
                email
            })
            if(response.status == 200){
                const sendCode = await axios.post("/msg",{
                    email
                })
                setToggle(!toggle)
                setErrorMessage("")
                // if(sendCode.status == 201){
                //     history.push("/login")
                // }
            } else{
                setErrorMessage(response.data)
            }
        } else{
            setErrorMessage("Enter Email")
        }
    }

    const checkCode = async()=>{
        const response = await axios.post("/check-msg",{
            email,
            code
        })
        if(response.status == 200){
            setPassToggle(!passToggle)
            // setToggle(!toggle)
            // setEmail("")
            setCode("")
        }
    }
    
    const saveFirstPass = (e)=>{
        setFirstPass(e.target.value)
    }
    
    const saveSecondPass = (e)=>{
        setSecondPass(e.target.value)
    }
    
    const resetPass = async()=>{
        console.log(firstPass,"firstPass");
        console.log(secondPass,"secondPass");
        if(firstPass == secondPass){
            const response = await axios.put("/re-pass",{
                password: firstPass,
                email:email,
            })
            console.log(response,"response");
            if(response.status == 200){
                setErrorMessage("")
                history.push("/login")
            }
        } else{
            setErrorMessage("Enter same password")
        }
    }

    return (
        <div>
            
            {
                passToggle? 
                <div>
                    <input type="password" value={firstPass} placeholder='Enter Password' onChange={(e)=>{setFirstPass(e.target.value)}} />
                    {firstPass}firstPass
                    <input type="password" value={secondPass} placeholder='Repeat Password' onChange={(e)=>{setSecondPass(e.target.value)}} />
                    {secondPass}secondPass
                    <button onClick={()=>{resetPass()}}>RESET</button>
                    {errorMessage}
                </div> 
                : 
                <div>
                <label>Email: </label>
                <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' />
                <button onClick={()=>{checkEmail()}}>Send Code To Email</button>
                {
                    toggle && <div>
                    <label>Check Email And Enter Code: </label>
                    <input onChange={(e)=>{setCode(e.target.value)}} type="text" placeholder='CODE' />
                    <button onClick={()=>{checkCode()}}>RESET PASSWORD</button>
                </div> 
                }
                {
                    errorMessage
                }
            </div>
            }
                
            
            
        </div>
    )
}
