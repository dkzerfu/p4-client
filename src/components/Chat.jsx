import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import moment from "moment"
import 'moment-timezone';
import axios from '../axios'
import "./Chat.css"

const Chat = ({ messages, rooms, user, setMessages }) => {
  const [input, setInput] = useState("")
  const [seed, setSeed] = useState("")
  const { roomId } = useParams()
  const [selectedRoom, setSelectedRoom] = useState(null)

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100))
  }, [])

  useEffect(() => {
    for (let i = 0; i < rooms.length; i++) {
      if (roomId === rooms[i]._id) {
        setSelectedRoom(i)
      }
    }
  }, [rooms, roomId])

  useEffect(() => {
    const settingMessage = async () => {
      const messagesResponse = await axios.get('api/rooms/sync')
      if (selectedRoom != null) {
        setMessages(messagesResponse.data[selectedRoom].messages)
      }
    }
    settingMessage()
  }, [selectedRoom, setMessages])

  const sendMessage = async (e) => {
    e.preventDefault()
    await axios.post("/api/messages/new", {
      id: roomId,
      message: input,
      name: user.name.givenName,
      timestamp: moment().format("MM-DD-YYYY hh:mm:ss"),
      received: false,

    })

    setInput('')
  }

  return (
    <div className="chat">

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{rooms[selectedRoom] ? rooms[selectedRoom].name : ""}</h3>
          <p>Last Seen {rooms[selectedRoom] ? rooms[selectedRoom].messages[rooms[selectedRoom].messages.length - 1].timestamp : ""}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => {
          return <p key={index} className={user ? (message.name === user.name.givenName ? "chat__message chat__receiver" : "chat__message") : ""}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        }
        )}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"

          />
          <button onClick={sendMessage} type="submit">Send</button>

        </form>
        <MicIcon />

      </div>
    </div>
  )
}

export default Chat