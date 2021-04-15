import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat'
import {Redirect} from 'react-router-dom'


const Sidebar = ({rooms, handleLogout, user}) => {

  if(user) {
        return (
          <div className='sidebar'>
        
            <div className="sidebar__header">
              <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu8RRiIx0GnXIPJjE0tCeg2J5URDZo0_Wo8YfnwPDZ4=s83-c-mo"/>
             <button onClick={handleLogout}>Logout</button>
              <div className="sidebar__headerRight">
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                <ChatIcon />
                </IconButton>
                <IconButton>
                <MoreVertIcon />
                </IconButton>
              </div>
            </div>
        
            <div className="sidebar__search">
              <div className="sidebar__searchContainer">
                <SearchOutlined />
                <input 
                  placeholder= "Room"
                  type="text"
                  />
              </div>
            </div>
        
              <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map((room, index) => (
                <SidebarChat key={index} id={room._id} name={room.name} />
              ))}
              </div>
        
          </div>
        )
    
} else {
    return <Redirect to="/" />
}

}

export default Sidebar
