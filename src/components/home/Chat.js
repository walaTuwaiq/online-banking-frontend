import React, {useState, useEffect} from 'react'
import "../../styles/Chat.css"
import ScrollToBottom from "react-scroll-to-bottom"

export default function Chat({socket, name, room}) {
    const [message, setMessage] = useState("")
    const [messagesList, setMessagesList] = useState([])

    const sendMessage = async()=>{
        if(message !== ""){
            const messageData = {
                room,
                author: name,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            socket.emit("send_message",messageData)
            setMessagesList([...messagesList,messageData])
            setMessage("")
        }
    }

    socket.on("receive_message",(data)=>{
        // console.log(data,"data");
        setMessagesList([...messagesList,data])
    })
    // useEffect(() => {

    // }, [socket])


    return (
        <div className='container-chat'>
            <div className='header-chat'>
                <p>LIVE CHAT:</p>
            </div>
            <div className='body-chat'>
                <ScrollToBottom className="scroll-container">
                    {
                        messagesList && messagesList.map((elem,index)=>{
                            return <div key={index} className='message-container' id={elem.author == name? "you" : "other"}>
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
