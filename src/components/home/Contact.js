import React,{useState,useEffect} from 'react'
import { io } from 'socket.io-client'
// import Chat from './Chat'
import "../../styles/Chat.css"
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom"
import axios from 'axios';


const socket = io.connect("http://localhost:5000")

export default function Contact({id}) {
    const [message, setMessage] = useState("")
    const [messagesListUser, setMessagesListUser] = useState([])
    const [messagesListAdmin, setMessagesListAdmin] = useState([])

    const user_id = useSelector((state) => state.token.user_id);
    
    const user_admin = useSelector((state) => state.token.user_admin);
    const user_name = useSelector((state) => state.token.user_name);
    const token = useSelector((state) => state.token.token);

    const sendMessage = async()=>{
        if(message !== ""){
            const messageData = {
                room:user_id,
                author: user_name,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                // userId:user_id
            }
            socket.emit("send_message",messageData)
            // console.log(messageData,"messageData");
            setMessagesListUser([...messagesListUser,messageData])
            setMessage("")

            const response = await axios.post("/send-message-chat",{
                userId:user_id,
                message,
                author:user_name,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            },{
                headers: {
                    authorization: `Bearer ${token}`,
                  },
            })
            // console.log(response.data,"response");
        }
    }

    socket.on("receive_message",(data)=>{
        console.log(data,"data");
        setMessagesListAdmin([...messagesListAdmin,data])
    })

    useEffect(() => {        
            const getMessages=async()=>{
                const response = await axios.get(`/chat-messages`,{
                    headers: {
                        authorization: `Bearer ${token}`,
                      },
                })
                if(response.status == 200){
    
                    if(response.data !== "not found messages"){
                        setMessagesListAdmin(response.data.adminChats)
                        setMessagesListUser(response.data.userChats)
                        // console.log(response.data,"responsee");
                    } 
                }
            }
        if(token){
            getMessages()
        }

    }, [token])


    return (
        <div className='container-chat'>
            {
                // console.log(messagesList,"messagesList")
            }
            <div className='header-chat'>
                <p>LIVE CHAT:</p>
            </div>
            <div className='body-chat'>
                <ScrollToBottom className="scroll-container">
                {
                        messagesListUser && messagesListUser.map((elem,index)=>{
                            return <div key={index} className='message-container' id={elem.author == user_name? "you" : "other"}>
                                <div className='text-message'>{elem.message}</div>
                                <div className='time-message'>{elem.time}</div>
                                <div className='author-message'>{elem.author}</div>
                            </div>
                        })
                    }
                    {
                        messagesListAdmin && messagesListAdmin.map((elem,index)=>{
                            return <div key={index} className='message-container' id={elem.author == user_name? "you" : "other"}>
                                <div className='text-message'>{elem.message}</div>
                                <div className='time-message'>{elem.time}</div>
                                <div className='author-message'>{elem.author}</div>
                            </div>
                        })
                    }
                </ScrollToBottom>

            </div>
            <div className='footer-chat'>
                <input value={message} type="text" placeholder='write here...' onChange={(e)=>{setMessage(e.target.value)}} onKeyPress={(e)=>{e.key==="Enter" && sendMessage()}} />
                <button onClick={()=>{sendMessage()}}>SEND</button>
            </div>
        </div>
    )
}
