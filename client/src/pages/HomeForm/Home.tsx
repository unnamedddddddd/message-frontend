import { useEffect, useRef, useState } from "react";
import './Home.css';
import { Message, Server, TextChat, WidgetCreateChat, VoiceChat, WidgetCreateServer } from "@components/chat";
import { useChat, useServer, useVoiceChat } from "@hooks/chat";
import { useAuth } from "@hooks/user";
import { Profile } from "@components/user";

const Home = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWidgetCreateChat, setShowWidgetCreateChat] = useState<boolean>(false);
  const [showWidgetCreateServer, setShowWidgetCreateServer] = useState<boolean>(false);

  const { userLogin, logOut } = useAuth();
  const {
    textChats,
    voiceChats,
    joinServer,
    currentServerId
  } = useServer();
  const {
    message, 
    messages, 
    servers,
    isConnected, 
    activeChatId, 
    setMessage,  
    disconnect, 
    setMessages,
    joinChat, 
    handleSubmit,
  } = useChat(userLogin); 
  const {
    joinVoiceChat,
    leaveVoiceChat,
  } = useVoiceChat(userLogin)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const leaveChat = () => {
    leaveVoiceChat();
    disconnect();
    setMessages([]);
  }
  
  return (
    <div className="home-container flex min-h-screen bg-[rgba(41,41,41,0.9)] p-5 gap-5">
      <div className="servers-sidebar flex flex-col w-[15%] bg-[rgba(53,53,54,0.9)] rounded-2xl p-5 border border-[rgba(94,95,97,0.3)] overflow-y-auto">
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
        <div className="create-server-container flex justify-center mt-auto">
          <button 
            className="show-widget-create-chat-button w-1/2 bg-[rgba(53,53,54,0.7)] border border-[rgba(109,114,117,0.4)] text-[#a3a2a3] px-4 py-2 rounded-xl transition-colors hover:bg-[rgba(97,99,102,0.7)]"
            onClick={() => setShowWidgetCreateServer(true)}
          >
          create server
          </button>
            <div className={`widget-overlay ${showWidgetCreateServer ? 'visible' : ''}`} onClick={() => setShowWidgetCreateServer(false)}>
              <div className="widget-window" onClick={e => e.stopPropagation()}>
                <WidgetCreateServer onClose={() => setShowWidgetCreateServer(false)} />
              </div>
          </div>
        </div>
      </div>
      <div className="chats-sidebar flex flex-col w-[15%] bg-[rgba(53,53,54,0.9)] rounded-2xl p-5 border border-[rgba(94,95,97,0.3)] overflow-y-auto">
        <div className="text-chats h-1/2">
          <label className="text-chats-label text-xs flex justify-center mb-2 text-[#a3a2a3]">Текстовые каналы</label>
          {textChats.map((chat) => (
            <div key={chat.name} className={`chat-item ${chat.name}-chat`}>
              <TextChat 
                chatId={chat.chatId}
                onJoinChat={joinChat}
                name={chat.name}
                disabled={activeChatId === chat.chatId}  
              />
            </div>
          ))}
        </div>
        <div className="voice-chats h-1/2 mt-4">
          <label className="voice-chats-label text-xs flex justify-center mb-2 text-[#a3a2a3]">Голосовые каналы</label>
          {voiceChats.map((chat) => (
            <div key={chat.name} className={`chat-item ${chat.name}-chat`}>
              <VoiceChat 
                chatId={chat.chatId}
                onJoinChat={joinVoiceChat}
                name={chat.name}
                disabled={activeChatId === chat.chatId}  
              />
            </div>
          ))}
        </div>
        <div className="buttons-container-chat flex gap-5 mt-4">
          <button 
            className="show-widget-create-chat-button w-1/2 bg-[rgba(53,53,54,0.7)] border border-[rgba(109,114,117,0.4)] text-[#a3a2a3] px-4 py-2 rounded-xl transition-colors hover:bg-[rgba(97,99,102,0.7)]"
            onClick={() => setShowWidgetCreateChat(true)}
          >
          create chat
          </button>
            <div className={`widget-overlay ${showWidgetCreateChat ? 'visible' : ''}`} onClick={() => setShowWidgetCreateChat(false)}>
              <div className="widget-window" onClick={e => e.stopPropagation()}>
                <WidgetCreateChat onClose={() => setShowWidgetCreateChat(false)} serverId={currentServerId}/>
              </div>
          </div>
          <button 
            className="out-chat ml-auto bg-[rgba(53,53,54,0.7)] border border-[rgba(109,114,117,0.4)] text-[#a3a2a3] px-4 py-2 rounded-xl transition-colors hover:bg-[rgba(97,99,102,0.7)]" 
            onClick= {leaveChat}
          >
            отключится
          </button>
        </div>
      </div>
      <div className='chat-main relative flex flex-col flex-[0_0_55%] min-w-0 bg-[rgba(65,66,67,0.9)] rounded-2xl border border-[rgba(107,108,110,0.3)]'>
       
        <div className='messages-container flex-1 flex flex-col overflow-y-auto bg-[rgba(53,53,54,0.7)] rounded-2xl mb-1 border border-[rgba(78,79,81,0.2)]'>
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
        <div className="clear-chat-container flex justify-end mb-1">
          <button className="clear-chat bg-[rgba(91,92,95,0.9)] border border-[rgba(109,114,117,0.4)] rounded-md text-[#a3a2a3] px-3 py-1 transition-colors hover:bg-[rgba(97,99,102,0.9)] mr-1" onClick={() => {
            setMessages([])
          }}> 
            🗑️ Очистить чат
          </button>
        </div>
        <div className="input-container">
          <form className='input-message flex gap-3 p-4 bg-[rgba(53,53,54,0.8)] rounded-2xl border border-[rgba(224,214,255,0.1)]' onSubmit={handleSubmit}>
            <input
              type='text'
              className='inputMessage flex-1 px-4 py-3 bg-[rgba(41,41,41,0.7)] border border-[rgba(109,114,117,0.4)] rounded-xl text-[#a3a2a3] text-base focus:outline-none focus:border-[#6d7275] focus:ring-2 focus:ring-[rgba(109,114,117,0.3)] placeholder:text-[rgba(224,214,255,0.5)]'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Введите сообщение'
            /> 
            <button
              type="submit"
              className='btn-message px-6 py-3 bg-gradient-to-br from-[#616366] to-[#6d7275] text-white rounded-xl border border-[rgba(109,114,117,0.3)] flex items-center justify-center transition-transform disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5'
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