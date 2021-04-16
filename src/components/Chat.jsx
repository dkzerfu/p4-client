import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from '../axios'
import "./Chat.css"

const Chat = ({ messages, rooms, user , setMessages}) => {
  const [input, setInput] = useState("")
  const [seed, setSeed] = useState("")
  const { roomId } = useParams()
  const [selectedRoom, setSelectedRoom] = useState(null)
  
  // const [roomName, setRoomName] = useState("")
  // const [messages, setMessages] = useState([])
  // console.log(roomId)
  // useEffect(() => {
  //   const room = rooms.filter(room => room._id === roomId)
    
  //   if (!room[0]) {
  //     return
  //   } else {
  //     console.log("this is the messages", messages)
  //     // setMessages(room[0].messages)
  //   }
  //   if (roomId && roomName > 0) {
  //     setRoomName(room[0].name)
  //   }
  // }, [roomId, roomName, rooms, messages])

  // useEffect(() => {
  //   setSeed(Math.floor(Math.random() * 100))
  // }, [roomId])
  useEffect(() => {
    for(let i = 0; i < rooms.length; i++){
      if(roomId === rooms[i]._id){
        setSelectedRoom(i)
      }
    }
  }, [rooms, roomId])

  useEffect(() => {
    const settingMessage = async () => {
      const messagesResponse = await axios.get('api/rooms/sync')
      console.log(selectedRoom)
      console.log(messagesResponse.data)
      if(selectedRoom != null){
        setMessages(messagesResponse.data[selectedRoom].messages)
      }
    }
    settingMessage()
  },[selectedRoom])

  const sendMessage = async (e) => {
    e.preventDefault()
    console.log('clicked')
    const response = await axios.post("/api/messages/new", {
      id: roomId,
      message: input,
      name: user.name.givenName,
      timestamp: Date.now(),
      received: false,

    })
    // console.log(response.data.messages[response.data.messages.length - 1])
    // setMessages(response.data.messages)
    setInput('')
  }

  // const messagess = messages ? (
  // messages.map((message, index) => (
  //   <p  key={index} className={message.name === user.name.givinName ? "chat__message chat__receiver" : "chat__message"}>
  //     <span className="chat__name">{message.name}</span>
  //     {message.message}
  //     <span className="chat__timestamp">{message.timestamp}</span>
  //   </p>

  // ))) : ""

console.log(messages)

  return (
    <div className="chat">

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          {/* <h3>{roomName}</h3> */}
          <p>Last seen at ...</p>
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
          return <p key={index} className={message.name === user.name.givenName ? "chat__message chat__receiver" : "chat__message"}>
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