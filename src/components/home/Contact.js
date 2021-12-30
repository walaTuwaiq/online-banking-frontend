import React,{useState} from 'react'
import { io } from 'socket.io-client'
import Chat from './Chat'

const socket = io.connect("http://localhost:5000")

export default function Contact() {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [toggle, setToggle] = useState(false)

    const joinRoom = ()=>{
        if(name !== "" && room !== ""){
            socket.emit("join_room",room)
            setToggle(!toggle)
        }
    }

    return (
        <div>
            {
                toggle? (
                    <div>
                        <Chat socket={socket} name={name} room={room}/>
                    </div>
                    
                ) : 
                (
                    <div>
                        <input type="text" placeholder='name' onChange={(e)=>{setName(e.target.value)}} />
                        <input type="text" placeholder='room' onChange={(e)=>{setRoom(e.target.value)}} />
                        <button onClick={()=>{joinRoom()}}>JOIN</button>
                    </div>
                )
            }
        </div>
    )
}
