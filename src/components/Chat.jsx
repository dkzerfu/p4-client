import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React from 'react'
import "./Chat.css"
import { useEffect, useState } from 'react'

const Chat = (props) => {
  const [message, setMessage] = useState("")
  const [msgHistory, setMsgHistory] = useState([])
  const [currentUser, setCurrentUser] = useState(true)

  useEffect(() => {
    if(!props.socket){
      console.log('no socket is available')
      return
    }
    console.log('sucess socket')
    props.socket.on('chat message', msg => addToMessageHistory(msg))
  }, [props.socket])

  const addToMessageHistory = msg => {
    console.log('something happened', msg)
    setMsgHistory(prev => [{
      userName: msg.userName,
      content: msg.content
    }, ...prev])
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.socket.emit('chat message', {
      userName: props.userName,
      content: message
    })
    setMessage('')
  }
  useEffect(() => {
    console.log(msgHistory, "############################")
  }, [msgHistory])

  const handleChange = e => {setMessage(e.target.value)}
  console.log(message)
  console.log(msgHistory)

  const mappedData = msgHistory.map((msg, idx) => 
  !currentUser ?
      <p  key={idx} className="chat__message">
      <span className="chat__name">{msg.userName}</span>
      {msg.content}
      <span className="chat__timestamp">{new Date().toUTCString()}</span>
      </p> : 
      <p  key={idx} className="chat__message chat__receiver">
      <span className="chat__name">{msg.userName}</span>
      {msg.content}
      <span className="chat__timestamp">{new Date().toUTCString()}</span>
      </p> 
      
      )
  
  return (
    <div className="chat">
      
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
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
        {mappedData}
      
        {/* <p className="chat__message">
          <span className="chat__name">Dagm</span>
          {message}
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message chat__receiver">
          <span className="chat__name">Dagm</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Dagm</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Type a message"
            type="text"
            value={message}
            onChange={handleChange}
          />
          <input type="submit"/>
            
        </form>
        <MicIcon />

      </div>
    </div>
  )
}

export default Chat
