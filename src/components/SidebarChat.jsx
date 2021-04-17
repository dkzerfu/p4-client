import { Avatar } from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react'
import "./SidebarChat.css"
import axios from '../axios'
import { Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom'


const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("")

  const data = useLocation()
  console.log(data)

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100))
  }, [])

  const createChat = async () => {
    const roomName = prompt("Please enter Room name for chat")

    if (roomName) {
      await axios.post("/api/rooms/new", {
        name: roomName
      })

    }
  }

  return (!addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>This is the last message</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
      className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  )
  )
}

export default SidebarChat
