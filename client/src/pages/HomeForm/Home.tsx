import { useEffect, useRef } from "react";
import './Home.css';
import { Message, Profile, Server, Chat } from '@/components';
import useAuth from "@/hooks/user/useAuth";
import useChat from "@/hooks/chat/useChat";

const Home = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userLogin, logOut } = useAuth();
  const {
    message, 
    messages, 
    servers,
    chats,
    isConnected, 
    activeChatId, 
    setMessage,  
    disconnect, 
    setMessages,
    joinChat, 
    joinServer,
    handleSubmit,
  } = useChat(userLogin); 

  //!!!
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="home-container">
      <div className="servers-sidebar">
        {servers.map((server) => (
          <div key={server.name} className={`${server.name}-chat`}>
           <Server 
            avatar={server.avatar}
            serverId={server.serverId}
            name={server.name}
            onJoinServer={joinServer}
          />  
          </div>
        ))} 
      </div>
      <div className="chats-sidebar">
        {chats.map((chat) => (
          <div key={chat.name} className={`chat-item ${chat.name}-chat`}>
            <Chat 
              chatId={chat.chatId}
              onJoinChat={joinChat}
              name={chat.name}
              disabled={activeChatId === chat.chatId}  
            />
          </div>
        ))}
        <button 
          className="out-chat" 
          disabled={!isConnected} 
          onClick={disconnect}
        >
          отключится
        </button>
      </div>
      <div className='chat-main'>
        <div className='messages-container'>
          {messages.map((msg, index) => (
            <div key={index} className={`${msg.type}-message-container`}>
              <Message
                userAvatar={msg.userAvatar} 
                type={msg.type}
                message={msg.message} 
                userName={msg.userName} 
                renderTime={msg.renderTime}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="clear-chat-container">
          <button className="clear-chat" onClick={() => {
            setMessages([])
          }}> 
            🗑️ Очистить чат
          </button>
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
              disabled={!message.trim() && !isConnected}
              title="Отправить"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <Profile 
        name={userLogin}
        logOut={logOut}
      /> 
    </div>
  );
};

export default Home;