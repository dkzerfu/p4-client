import React from 'react'
import './App.css';
import Chat from './components/Chat'
import Sidebar from './components/Sidebar';
import Pusher from 'parse-json'
import axios from './axios'
import {useState, useEffect} from 'react'

const App = () => {
  const [messages, setMessages] = useState([])

  useEffect(async () => {
    const response = await axios.get('api/messages/sync')
    setMessages(response.data)
  }, [])

  useEffect(() => {
    const pusher = new Pusher('428941c32f545141c1c0', {
      cluster: 'mt1'
    });
  
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
      setMessages([...messages, data]) 
    });
    
    return () => {
      channel.unsubscribe()
      channel.unbind_all()
    }

  }, [messages])
console.log(messages)

  return (
      <div className="app">
        <div className="app__body">
          <Sidebar />
          <Chat />
        </div>
      </div>
  );
  
}

export default App;
