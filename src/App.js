import React from 'react'
import {useState, useEffect} from 'react'
import {io} from 'socket.io-client'
import './App.css';
import Chat from './components/Chat'
import Sidebar from './components/Sidebar';

let socket = null;

const App = () => {
    const [userName, setUsername] = useState("")
    
    useEffect(() => {
        // Ask the user for their name on page load
        const name = prompt('Please enter your initials')
        setUsername(name)
        const URL = "http://localhost:3030"
        // Setup socket connection 
        socket = io(URL, {
            query: {
                userName: name
            }
        })
        // Clean up the effect (aka on component unmount, close the connection)
        return () => socket.disconnect();
    }, [])
    
  console.log(userName)
  return (
    <div className="app">
      <div className="app__body">
      <Sidebar socket={socket} userName={userName}/>
      <Chat socket={socket} userName={userName}/>
      </div>
    </div>
  );
}

export default App;
