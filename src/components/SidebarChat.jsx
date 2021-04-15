import { Avatar } from '@material-ui/core'
import React from 'react'
import {useState, useEffect} from 'react'
import "./SidebarChat.css"
import axios from '../axios'
import { Link } from 'react-router-dom'


const SidebarChat = ({id, name, addNewChat}) => {
  const [seed, setSeed] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100))
  }, [])
  
  const createChat = async () => {
    console.log("chat created")
    const roomName = prompt("Please enter Room name for chat")

    if(roomName){
      // create a room to the database
    await axios.post("/api/rooms/new", {
      name: roomName
    })
    
    }
  }

  return ( !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>This is the last message</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
      className="sidebarChat">
      <h2>add new Chat</h2>
    </div>
  )
  )
}

export default SidebarChat
