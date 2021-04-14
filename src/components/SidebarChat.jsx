import { Avatar } from '@material-ui/core'
import React from 'react'
import "./SidebarChat.css"


const SidebarChat = (props) => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{props.userName}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default SidebarChat
