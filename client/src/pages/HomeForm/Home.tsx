import { useEffect, useRef, useState } from "react";
import { useChat, useServer, useVoiceChat } from "@/hooks/chat";
import { useAuth } from "@/hooks/user";
import { Member, Message } from "@/components/chat";
import { useWebSocket } from "@/hooks/chat/useWebSocket";
import { WidgetCreateChat } from "@/components/chat/Widgets";
import { TextChat, VoiceChat } from "@/components/chat/Chats";

const Home = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const [showWidgetCreateChat, setShowWidgetCreateChat] = useState<boolean>(false);

  const {
    messages,
    sendTypingSocket,
    stopTypingSocket,
    typingUsers,
    currentServerId
  } = useWebSocket();

  const { userLogin } = useAuth();
  const {
    textChats,
    voiceChats,
    serverMembers,
    loadChats,
  } = useServer();
  const {
    message,
    isConnected,
    activeChatId,
    setMessage,
    joinChat,
    handleSubmit,
  } = useChat(userLogin);
  const {
    joinVoiceChat,
    // leaveVoiceChat,
  } = useVoiceChat()
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typingUsers.length > 0) {
      typingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typingUsers]);

  const currentMessages = activeChatId ? (messages[activeChatId] || []) : [];

  const handleCloseWidgetCreateChat = () => {
    loadChats();
    setShowWidgetCreateChat(false)
  }

  return (
    <div className="flex h-full gap-2 overflow-x-hidden">
      <div className="flex flex-col w-[15%] bg-[#2b2d31] rounded-xl p-4 overflow-y-auto shrink-0">
        <div className="h-1/2">
          <div className="flex justify-center items-center gap-1 mb-1">
            <label className="text-xs flex justify-center text-[#a3a2a3]">Текстовые каналы</label>
            <button
              className="text-[#a3a2a3] px-1 rounded-full transition-colors hover:bg-[#616366]/70 font-semibold text-lg "
              onClick={() => setShowWidgetCreateChat(true)}
            >
              +
            </button>
          </div>
          {textChats.map((chat) => (
            <div key={chat.name}>
              <TextChat
                type="server"
                chatId={chat.chatId}
                onJoinChat={joinChat}
                name={chat.name}
                disabled={activeChatId === chat.chatId}
              />
            </div>
          ))}

        </div>
        <div className="h-1/2 mt-4">
          <div className="flex justify-center items-center gap-1 mb-1">
            <label className="text-xs flex justify-center text-[#a3a2a3]">Голосовые каналы</label>
            <button
              className="text-[#a3a2a3] px-1 rounded-full transition-colors hover:bg-[#616366]/70 font-semibold text-lg "
              onClick={() => setShowWidgetCreateChat(true)}
            >
              +
            </button>
          </div>
          {voiceChats.map((chat) => (
            <div key={chat.name} className="mb-1">
              <VoiceChat
                chatId={chat.chatId}
                onJoinChat={joinVoiceChat}
                name={chat.name}
                disabled={activeChatId === chat.chatId}
              />
            </div>
          ))}
        </div>

        <div className={`widget-overlay ${showWidgetCreateChat ? 'visible' : ''}`} onClick={() => setShowWidgetCreateChat(false)}>
          <div className="widget-window" onClick={e => e.stopPropagation()}>
            <WidgetCreateChat onClose={handleCloseWidgetCreateChat} serverId={currentServerId} />
          </div>
        </div>
      </div>
      <div className='relative flex flex-col flex-[0_0_70%] min-w-0 bg-[#383a40] rounded-xl'>
        <div className='flex-1 flex flex-col overflow-y-auto bg-[#313338]/70 rounded-2xl mb-1 border border-[#4e4f51]/20 p-4'>
          {currentMessages.map((msg, index) => (
            <div key={index} className={'self-start flex items-center gap-[10px] mb-3 max-w-[70%]'}>
              <Message
                userAvatar={msg.userAvatar}
                type={msg.type}
                message={msg.message}
                userName={msg.userName}
                renderTime={msg.renderTime}
              />
            </div>
          ))}
          <div ref={typingRef} className="flex justify-end mt-auto">
            {typingUsers.length > 0 && (
              <div className="bg-[#4e4f51]/90 backdrop-blur-sm rounded-2xl px-4 py-2 text-sm text-[#a3a2a3] animate-pulse w-fit">
                {typingUsers.length === 1 ? (
                  <>✍️ {typingUsers[0]} печатает...</>
                ) : (
                  <>✍️ {typingUsers.length} человека печатают...</>
                )}
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
        {/* <div className="flex justify-end mb-1">
          <button className="bg-[#5b5c5f]/90 border border-[#6d7275]/40 rounded-md text-[#a3a2a3] px-3 py-1 transition-colors hover:bg-[#616366] mr-1 text-sm" onClick={() => {
          }}> 
            🗑️ Очистить чат
          </button>
        </div> */}
        <form className='flex gap-3 p-4 bg-[#353536]/80 rounded-2xl border border-[#e0d6ff]/10' onSubmit={handleSubmit}>
          <input
            type='text'
            className='flex-1 px-4 py-3 bg-[#292929]/70 border border-[#6d7275]/40 rounded-xl text-[#a3a2a3] text-base focus:outline-none focus:border-[#6d7275] focus:ring-2 focus:ring-[#6d7275]/30 placeholder:text-[#a3a2a3]/50'
            value={message}
            onChange={(e) => {
              const newValue = e.target.value;
              setMessage(newValue);
              if (newValue === "") {
                stopTypingSocket();
              } else {
                sendTypingSocket();
              }
            }}
            onBlur={() => {
              if (message === "") return;
              stopTypingSocket();
            }}
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
      <div className="flex flex-1 shrink-0 flex-col gap-5 rounded-xl bg-[#2b2d31] p-4 min-h-0">
        <div className="flex-col">
          {serverMembers.map(member => (
            <div className="" key={member.id}>
              <Member
                id={member.id}
                name={member.name}
                avatar={member.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;