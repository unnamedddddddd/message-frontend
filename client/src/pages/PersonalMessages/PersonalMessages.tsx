import { Friend, Message } from "@/components/chat";
import { WidgetFindUsers } from "@/components/chat/Widgets";
import { useWebSocket } from "@/hooks/chat";
import { useChat } from "@/hooks/chat/Chats";
import { useFriends } from "@/hooks/chat/useFriends";
import { useAuth } from "@/hooks/user";
import { useEffect, useRef, useState } from "react";

const PersonalMessages = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const [showFindUsersWidget, setShowFindUsersWidget] = useState<boolean>(false);

  const { messages, sendTypingSocket, stopTypingSocket, typingUsers } = useWebSocket();
  const { friends } = useFriends();
  const { userLogin } = useAuth();
  const { message, isConnected, activeChatId, setMessage, joinChat, handleSubmit } = useChat(userLogin);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typingUsers.length > 0) {
      typingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typingUsers]);

  const currentMessages = activeChatId ? (messages[activeChatId] || []) : [];

  const panel = "bg-[#0d0d0f]/75 backdrop-blur-md border border-white/[0.06]";

  return (
    <div className="flex h-full gap-2 overflow-x-hidden">
      {/* Friends sidebar */}
      <div className={`flex flex-col w-[15%] ${panel} rounded-xl p-4 overflow-y-auto shrink-0`}>
        <span className="text-xs text-white/30 uppercase tracking-widest mb-3 text-center">Друзья</span>

        {friends.length === 0 ? (
          <div className="flex items-center justify-center h-full flex-col gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48" fill="none">
              <circle cx="32" cy="20" r="12" stroke="#949ba4" strokeWidth="2" fill="none" />
              <line x1="26" y1="16" x2="30" y2="20" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="30" y1="16" x2="26" y2="20" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="34" y1="16" x2="38" y2="20" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="38" y1="16" x2="34" y2="20" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="32" y1="32" x2="32" y2="48" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="44" x2="44" y2="44" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="32" y1="48" x2="24" y2="58" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
              <line x1="32" y1="48" x2="40" y2="58" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[#949ba4]/70 text-xs text-center leading-relaxed">
              У вас пока нет<br />друзей
            </span>
          </div>
        ) : friends.map(friend => (
          <div key={friend.id}>
            <Friend
              online={friend.online}
              id={friend.friendId}
              friendId={friend.friendId}
              avatar={friend.avatar}
              name={friend.name}
              onJoinChat={joinChat}
              disabled={activeChatId === friend.id}
            />
          </div>
        ))}

        <div className="mt-auto flex justify-center pt-3">
          <button
            className="bg-transparent border border-white/25 text-[#a3a2a3] px-4 py-2 rounded-full transition-all hover:scale-105 hover:border-white/50 hover:text-white active:scale-95 font-semibold text-sm"
            onClick={() => setShowFindUsersWidget(true)}
          >
            + Добавить
          </button>
        </div>
      </div>

      <div
        className={`widget-overlay-find ${showFindUsersWidget ? 'visible' : ''} fixed inset-0 flex justify-center items-start pt-10`}
        onClick={() => setShowFindUsersWidget(false)}
      >
        <div className="widget-window w-full max-w-[800px] px-4" onClick={e => e.stopPropagation()}>
          <WidgetFindUsers onClose={() => setShowFindUsersWidget(false)} />
        </div>
      </div>

      {/* Chat area */}
      <div className={`relative flex flex-col flex-1 min-w-0 ${panel} rounded-xl`}>
        <div className='flex-1 flex flex-col overflow-y-auto bg-black/80 rounded-xl mb-1 border border-white/[0.04] p-4'>
          {currentMessages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === 'my'
                ? 'self-end flex gap-[10px] mb-3 max-w-[70%]'
                : 'self-start flex items-center gap-[10px] mb-3 max-w-[70%]'
              }
            >
              <Message userAvatar={msg.userAvatar} type={msg.type} message={msg.message} userName={msg.userName} renderTime={msg.renderTime} />
            </div>
          ))}

          <div ref={typingRef} className="flex justify-end mt-auto">
            {typingUsers.length > 0 && (
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl px-4 py-2 text-sm text-[#a3a2a3] animate-pulse w-fit">
                <>✍️ {typingUsers[0]} печатает...</>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalMessages;
