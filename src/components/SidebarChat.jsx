import { Avatar } from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react'
import "./SidebarChat.css"
import axios from '../axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'


const SidebarChat = ({ id, name, addNewChat, room }) => {
  const [seed, setSeed] = useState("")
  const { roomId } = useParams()

  const handleDelete = async () => {
    await axios.delete(`/api/rooms/delete/${roomId}`)
  }

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
  console.log(roomId)
  return (!addNewChat ? (
    <Link className="sidebarLink" to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name.toUpperCase()}</h2>
          <p><span>{room.messages[room.messages.length - 1] ? room.messages[room.messages.length - 1].name : ""}</span> : {room.messages[room.messages.length - 1] ? room.messages[room.messages.length - 1].message : "Last Message"}</p>
        </div>
        <div className="sidebar__button" >
          <button className="hidden" onClick={handleDelete} >Delete</button>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
      className="addNewChat">
      <h2>Add New Chat</h2>
    </div>
  )
  )
}

export default SidebarChat
