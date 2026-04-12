import { Friend, Message, Server } from "@/components/chat";
import Notification from "@/components/chat/Notiflication";
import { useChat, useServer } from "@/hooks/chat";
import { useFriends } from "@/hooks/chat/useFriends";
import { useNotification } from "@/hooks/chat/useNotification";
import { useAuth } from "@/hooks/user";
import { useEffect, useRef } from "react";

const PersonalMessages = () => {
  const { servers, joinServer } = useServer();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    removeNotification
  } = useNotification()
  const {
    friends
  } = useFriends();
  const { userLogin, logOut } = useAuth();

  const {
    message, 
    messages, 
    isConnected, 
    activeChatId, 
    setMessage,  
    setMessages,
    joinChat, 
    handleSubmit,
  } = useChat(userLogin); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const leaveChat = () => {

  }
  
  return (
    <div className="flex h-screen bg-[#292929]/90 p-5 gap-5">
      <div className="flex flex-col w-fit bg-[#353536]/90 rounded-2xl p-5 border border-[#5e5f61]/30 overflow-y-auto shrink-0">
        {servers.map((server) => (
          <div key={server.name}>
            <Server 
              avatar={server.avatar}
              serverId={server.serverId}
              name={server.name}
              onJoinServer={joinServer}
            />  
          </div>
        ))}  
      </div>
      <div className="flex flex-col w-[15%] bg-[#353536]/90 rounded-2xl p-5 border border-[#5e5f61]/30 overflow-y-auto shrink-0">
        <span className="flex justify-center text-lg mb-1">Друзья</span>
        {friends.map(friend => (
          <div className="" key={friend.id}>
            <Friend
              id={friend.friendId}
              friendId={friend.friendId}
              avatar={friend.avatar}
              name={friend.name}
              onJoinChat={joinChat}
              disabled={activeChatId === friend.id}  
            />
          </div> 
        ))} 
      </div>
       <div className='relative flex flex-col flex-1 min-w-0 bg-[#414243]/90 rounded-2xl border border-[#6b6c6e]/30'>
        <div className="absolute top-0 left-0 right-0 z-50 flex flex-col gap-2 p-4 pointer-events-none">
          {notifications.map(notif => (
            <div key={notif.notificationId} className="pointer-events-auto self-end">
              <Notification 
                type={notif.type} 
                message={notif.message} 
                onClose={() => removeNotification(notif.notificationId)} 
                notificationId={notif.notificationId} 
              />
            </div>
          ))}
        </div>
        <div className='flex-1 flex flex-col overflow-y-auto bg-[#353536]/70 rounded-2xl mb-1 border border-[#4e4f51]/20 p-4'>
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'my' ? 'self-end flex gap-[10px] mb-3 max-w-[70%]' : 'self-start flex items-center gap-[10px] mb-3 max-w-[70%]'}>
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
        <div className="flex justify-end mb-1">
          <button className="bg-[#5b5c5f]/90 border border-[#6d7275]/40 rounded-md text-[#a3a2a3] px-3 py-1 transition-colors hover:bg-[#616366] mr-1 text-sm" onClick={() => {
            setMessages([])
          }}> 
            🗑️ Очистить чат
          </button>
        </div>
        <div className="">
          <form className='flex gap-3 p-4 bg-[#353536]/80 rounded-2xl border border-[#e0d6ff]/10' onSubmit={handleSubmit}>
            <input
              type='text'
              className='flex-1 px-4 py-3 bg-[#292929]/70 border border-[#6d7275]/40 rounded-xl text-[#a3a2a3] text-base focus:outline-none focus:border-[#6d7275] focus:ring-2 focus:ring-[#6d7275]/30 placeholder:text-[#a3a2a3]/50'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Введите сообщение'
            /> 
            <button
              type="submit"
              className='px-6 py-3 bg-gradient-to-br from-[#616366] to-[#6d7275] text-white rounded-xl border border-[#6d7275]/30 flex items-center justify-center transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!message.trim() && !isConnected}
              title="Отправить"
            >
              <svg xmlns="http://w3.org" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalMessages;