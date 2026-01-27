import { useEffect, useRef, useState } from 'react';
import type { FormEvent} from 'react';
import './App.css'
import SERVER_URL from './config'
import type MessageProps from './interfaces/MessageProps';
import Message from './components/Message';

function App() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const socket = useRef<WebSocket| null>(null);

  useEffect(() => {
    socket.current = new WebSocket(SERVER_URL);

    socket.current.onmessage = (event: MessageEvent) => {
      console.log(event.data)
      const data = JSON.parse(event.data)
      setMessages(prev => [...prev, {message: data.message, type: 'chat'}])
    }


    return () => {
      socket.current?.close();
    };
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.current?.send(JSON.stringify({
      message,
      time: new Date().toLocaleString(),
      type: 'message'
    }))
    setMessages(prev => [...prev,{message, type:'my'}])
    setMessage('');
  }

  return (
    <>
      <div className='chat-app'> 
        <div className='messages-container'>
          {messages.map((msg, index) => (
            <div key={index} className={`${msg.type}-message`}>
              <Message type={msg.type} message={msg.message}/>
            </div>
          ))}
      </div>
      <div className='form-container'>
        <form className='input-message' onSubmit={handleSubmit}>         
          <input 
            type='text' 
            className='inputMesage' 
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            placeholder='Введите сообщение'/>
          <button className='btn-message'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
          </button>
        </form>
        </div>
      </div>
    </>
  )
}

export default App
