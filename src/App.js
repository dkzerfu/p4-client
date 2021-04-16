import React from 'react'
import './App.css';
import Chat from './components/Chat'
import Sidebar from './components/Sidebar';
import Pusher from 'pusher-js'
import axios from './axios'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt from 'jsonwebtoken'
import Login from './components/Login';
import SaveToken from './pages/saveToken';

const App = () => {
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    try { 
        if(token) {
            const user = jwt.decode(token)
            // console.log('Ther user from token', user)
            setUser(user)
        }
    } catch(err) {
        console.log(err)
        console.log('the token is expired!')
        localStorage.removeItem('jwt')
        setUser(null)
    }
}, [])

  useEffect(() => {
    const roomData = async () => {
      const roomsResponse = await axios.get('api/rooms/sync')
      const MessagesResponse = await axios.get('api/messages/sync')
      setMessages(MessagesResponse.data)
      setRooms(roomsResponse.data)
      
    }
    roomData()
  }, [])
  useEffect(() => {
    const pusher = new Pusher('428941c32f545141c1c0', {
      cluster: 'mt1'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages, data])
    });
    return () => {
      channel.unsubscribe()
      channel.unbind_all()
    }

  }, [messages])

  useEffect(() => {
    const pusher = new Pusher('428941c32f545141c1c0', {
      cluster: 'mt1'
    });
    const roomChannel = pusher.subscribe('rooms');
    roomChannel.bind('inserted', function(data) {
      setRooms([...rooms, data])
    });
    return () => {
      roomChannel.unsubscribe()
      roomChannel.unbind_all()
    }

  }, [rooms])

  const handleLogout = () => {
    if(localStorage.getItem('jwt')) {
        localStorage.removeItem('jwt')
        setUser(null)
    }
}
  return (
      <div className="app">
        
      
        <div className="app__body">
          <Router>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/saveToken">
                <SaveToken setUser={setUser}/>
              </Route>
              <Route exact path="/rooms">
                <Sidebar rooms={rooms} handleLogout={handleLogout} user={user}/>
              </Route>
              <Route path="/rooms/:roomId">
                <Sidebar rooms={rooms} handleLogout={handleLogout} user={user}/>
                <Chat rooms={rooms} user={user} setRooms = {setRooms}/>
              </Route>
            </Switch>
          </Router>
        </div>
     
      </div>
  );
  
}

export default App;
