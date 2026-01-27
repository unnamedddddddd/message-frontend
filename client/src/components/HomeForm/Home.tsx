import { useEffect, useRef, useState, type FormEvent } from "react";
import Message from "../Message";
import SERVER_URL from "../../config";
import type MessageProps from "../../interfaces/MessageProps";
import './Home.css';
import Chat from "../Chat";
import test from '../../assets/i.png';

const Home = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.current = new WebSocket(SERVER_URL);

    socket.current.onmessage = (event: MessageEvent) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, { message: data.message, type: 'chat' }]);
    };

    return () => {
      socket.current?.close();
    };
  }, []);

  //!!!
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.current?.send(JSON.stringify({
      message,
      time: new Date().toLocaleString(),
      type: 'message'
    }));
    setMessages(prev => [...prev, { message, type: 'my' }]);
    setMessage('');
  };

  return (
    <>
      <div className="home-container">
          <div className="chats-sidebar">
            <Chat image={test} name='test' />
          </div>
          <div className="separator"><hr/></div>
          <div className='chat-main'>
            <div className='messages-container'>
              {messages.map((msg, index) => (
                <div key={index} className={`${msg.type}-message`}>
                  <Message type={msg.type} message={msg.message} />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
              <form className='input-message' onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='inputMessage'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Введите сообщение'
                />
                <button
                  type="submit"
                  className='btn-message'
                  disabled={!message.trim()}
                  title="Отправить"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;