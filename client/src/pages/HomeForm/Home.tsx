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

  const { messages, sendTypingSocket, stopTypingSocket, typingUsers, currentServerId } = useWebSocket();
  const { userLogin } = useAuth();
  const { textChats, voiceChats, serverMembers, loadChats } = useServer();
  const { message, isConnected, activeChatId, setMessage, joinChat, handleSubmit } = useChat(userLogin);
  const { joinVoiceChat, isInCall, leaveVoiceChat } = useVoiceChat();

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
    setShowWidgetCreateChat(false);
  };
  console.log(isInCall);

  const panel = "bg-[#0d0d0f]/75 backdrop-blur-md border border-white/[0.06]";

  return (
    <div className="flex h-full gap-2 overflow-x-hidden">
      {/* Channels sidebar */}
      <div className={`flex flex-col w-[15%] ${panel} rounded-xl p-4 overflow-x-hidden shrink-0`}>
        <div className="gap-2 flex flex-col h-svh p-2">

          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex justify-center items-center gap-1 mb-1 shrink-0">
              <label className="text-xs text-white/30 uppercase tracking-widest">Текстовые</label>
              <button
                className="text-[#a3a2a3] px-1 rounded-full transition-colors hover:bg-white/[0.08] hover:text-white font-semibold text-lg"
                onClick={() => setShowWidgetCreateChat(true)}
              >
                +
              </button>
            </div>
            <div className="overflow-y-auto flex flex-col flex-1 min-h-0">
              {textChats.map((chat) => (
                <div key={chat.name}>
                  <TextChat type="server" chatId={chat.chatId} onJoinChat={joinChat} name={chat.name} disabled={activeChatId === chat.chatId} />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-white/[0.05] my-1" />

          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex justify-center items-center gap-1 mb-1 shrink-0">
              <label className="text-xs text-white/30 uppercase tracking-widest">Голосовые</label>
              <button
                className="text-[#a3a2a3] px-1 rounded-full transition-colors hover:bg-white/[0.08] hover:text-white font-semibold text-lg"
                onClick={() => setShowWidgetCreateChat(true)}
              >
                +
              </button>
            </div>
            <div className="overflow-y-auto flex flex-col flex-1 min-h-0 h-fit">
              {voiceChats.map((chat) => (
                <div key={chat.name} className="mb-1">
                  <VoiceChat chatId={chat.chatId} onJoinChat={joinVoiceChat} name={chat.name} disabled={activeChatId === chat.chatId} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {isInCall && (
          <div className="bg-black/60 w-full flex justify-between items-center gap-5 absolute bottom-0 left-1/2 -translate-x-1/2 h-1/6 px-6 rounded-xl">
            <span className="text-[#a3a2a3]">
              Выйти из чата?
            </span>
            <button onClick={leaveVoiceChat} className="hover:bg-white/[0.08] p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            </button>
          </div>
        )}

        <div className={`widget-overlay ${showWidgetCreateChat ? 'visible' : ''}`} onClick={() => setShowWidgetCreateChat(false)}>
          <div className="widget-window" onClick={e => e.stopPropagation()}>
            <WidgetCreateChat onClose={handleCloseWidgetCreateChat} serverId={currentServerId} />
          </div>
        </div>

      </div>

      {/* Chat area */}

      <div className={`relative flex flex-col flex-[0_0_70%] min-w-0 ${panel} rounded-xl`}>
        <div className='flex-1 flex flex-col overflow-y-auto bg-black/80 rounded-xl mb-1 border border-white/[0.04] p-4'>
          {currentMessages.map((msg, index) => (
            <div key={index} className='self-start flex items-center gap-[10px] mb-3 max-w-[70%]'>
              <Message userAvatar={msg.userAvatar} type={msg.type} message={msg.message} userName={msg.userName} renderTime={msg.renderTime} />
            </div>
          ))}
          <div ref={typingRef} className="flex justify-end mt-auto">
            {typingUsers.length > 0 && (
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl px-4 py-2 text-sm text-[#a3a2a3] animate-pulse w-fit">
                {typingUsers.length === 1 ? <>✍️ {typingUsers[0]} печатает...</> : <>✍️ {typingUsers.length} человека печатают...</>}
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <form className='flex gap-3 p-3 bg-transparent' onSubmit={handleSubmit}>
          <input
            type='text'
            className='flex-1 px-4 py-3 bg-black/60 border border-white/[0.08] rounded-xl text-[#a3a2a3] text-base focus:outline-none focus:border-white/20 transition-colors placeholder:text-[#a3a2a3]/40'
            value={message}
            onChange={(e) => {
              const newValue = e.target.value;
              setMessage(newValue);
              if (newValue === "") stopTypingSocket();
              else sendTypingSocket();
            }}
            onBlur={() => { if (message === "") return; stopTypingSocket(); }}
            placeholder='Введите сообщение'
          />
          <button
            type="submit"
            className='px-6 py-3 bg-white/[0.08] border border-white/[0.08] text-[#a3a2a3] rounded-xl flex items-center justify-center transition-all hover:bg-white/[0.14] hover:text-white hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed'
            disabled={!message.trim() && !isConnected}
            title="Отправить"
          >
            <svg xmlns="http://w3.org" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Members sidebar */}
      <div className={`flex flex-1 shrink-0 flex-col rounded-xl ${panel} p-4 min-h-0`}>
        <span className="text-xs text-white/30 uppercase tracking-widest mb-3 text-center">Участники</span>
        <div className="flex-col">
          {serverMembers.map(member => (
            <div key={member.id}>
              <Member id={member.id} name={member.name} avatar={member.avatar} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
