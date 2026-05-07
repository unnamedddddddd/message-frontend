import { Friend, Message } from "@/components/chat";
import { WidgetFindUsers } from "@/components/chat/Widgets";
import { useChat, useWebSocket } from "@/hooks/chat";
import { useFriends } from "@/hooks/chat/useFriends";
import { useAuth } from "@/hooks/user";
import { useEffect, useRef, useState } from "react";

const PersonalMessages = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const [showFindUsersWidget, setShowFindUsersWidget] = useState<boolean>(false);

  const {
    messages,
    sendTypingSocket,
    stopTypingSocket,
    typingUsers,
  } = useWebSocket();

  const { friends } = useFriends();
  const { userLogin } = useAuth();

  const {
    message,
    isConnected,
    activeChatId,
    setMessage,
    joinChat,
    handleSubmit,
  } = useChat(userLogin);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typingUsers.length > 0) {
      typingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typingUsers]);

  const currentMessages = activeChatId ? (messages[activeChatId] || []) : [];

  return (
    <div className="flex h-full gap-2 overflow-x-hidden">
      <div className="flex flex-col w-[15%] bg-[#2b2d31] rounded-xl p-4 overflow-y-auto shrink-0">
        <span className="flex justify-center text-lg mb-1 text-[#a3a2a3]">Друзья</span>
        {friends.length === 0 ? (
          <div className="flex items-center justify-center h-full flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
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
            <span className="text-[#949ba4] text-sm text-center">
              Ой... <b>у вас нет друзей?!</b><br />
              <span className="text-[#6c6e70] text-md">Пора завести!</span>
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
        <div className="mt-auto flex justify-center">
          <button
            className="bg-[#353536]/70 border border-[#6d7275]/40 text-[#a3a2a3] px-4 py-2 rounded-xl transition-colors hover:bg-[#616366]/70 font-semibold text-sm"
            onClick={() => setShowFindUsersWidget(true)}
          >
            Добавить друга
          </button>
        </div>
      </div>

      <div
        className={`widget-overlay-find ${showFindUsersWidget ? 'visible' : ''} fixed inset-0 flex justify-center items-start pt-10`}
        onClick={() => setShowFindUsersWidget(false)}
      >
        <div
          className="widget-window w-full max-w-[800px] px-4"
          onClick={e => e.stopPropagation()}
        >
          <WidgetFindUsers onClose={() => setShowFindUsersWidget(false)} />
        </div>
      </div>

      <div className='relative flex flex-col flex-1 min-w-0 bg-[#383a40] rounded-xl'>
        <div className='flex-1 flex flex-col overflow-y-auto bg-[#313338]/70 rounded-2xl mb-1 border border-[#4e4f51]/20 p-4'>
          {currentMessages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === 'my'
                ? 'self-end flex gap-[10px] mb-3 max-w-[70%]'
                : 'self-start flex items-center gap-[10px] mb-3 max-w-[70%]'
              }
            >
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
                <>✍️ {typingUsers[0]} печатает...</>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <form
          className='flex gap-3 p-4 bg-[#353536]/80 rounded-2xl border border-[#e0d6ff]/10'
          onSubmit={handleSubmit}
        >
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