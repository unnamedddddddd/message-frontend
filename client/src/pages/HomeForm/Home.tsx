import { useEffect, useRef, useState, type FormEvent } from "react";
import Message from "../../components/Message";
import type MessageProps from "../../interfaces/MessageProps";
import './Home.css';
import test from '../../assets/i.png';
import bohema from '../../assets/bohema.png';
import { useNavigate } from 'react-router-dom'
import WebSocketChat from "../../modules/websocket-client";
import Profile from "../../components/Profile";
import LogOut from "../../scripts/chat/LogOut";
import getUserProfile from "../../scripts/chat/getUsetProfile";
import Server from "../../components/Server";
import Chat from "../../components/Chat";
import type ChatProps from "../../interfaces/ChatProps";
import getChats from "../../scripts/chat/getChats";
import getServers from "../../scripts/chat/getServers";
import type ServerProps from "../../interfaces/ServerProps";
import type ChatResponse from "../../interfaces/ChatResponseProps";
import type serverResponse from "../../interfaces/ServerResponseProps";

const Home = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [userLogin, setUserLogin] = useState<string>('');
  const socketRef = useRef<WebSocketChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userId: string | null = localStorage.getItem('user_id');
        if (!userId) {
          console.error('userId не найден в localStorage');
          navigate('/login');
          return;
        }

        const data = await getUserProfile(Number(userId));
        
        if (!data.success) {
          console.log('Пользователь не авторизован:', data.message);
          navigate('/login');
          return;
        }

        setUserLogin(data.userLogin);
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const joinServer = async (serverId: number) => {
    const chatsResponse = await getChats(serverId);

    if (!chatsResponse.success) {
      console.log('Чаты не найдены:', chatsResponse.message);
      return;
    }
    const chatsAsChatProps: ChatProps[] = chatsResponse.chats.map((chat: ChatResponse) => {
      return {
        chatId: chat.chat_id,
        name: chat.chat_name,  
      };
    })

    setChats(chatsAsChatProps)  
  }

  useEffect(() => {
    const loadServers  = async () => {
      const serversResponse = await getServers();

      console.log(serversResponse);
      
      if (!serversResponse.success) {
        console.log('Сервера не найдены:', serversResponse.message);
        return;
      }
     
      const serverAsServerProps: ServerProps[] = serversResponse.servers.map((server: serverResponse) => {
        return {
          serverId: server.server_id,
          name: server.server_name,  
        };
      })
      setServers(serverAsServerProps);
    }

    loadServers();
  }, [])

  const connect = (roomId: string) => {
    if (isConnected) return;

    socketRef.current = new WebSocketChat()

    const handleMessage = (data: MessageProps) => {    
      setMessages(prev => [...prev, {
        type: data.type, 
        message: data.message,
        userName: data.userName,
        renderTime: formatTime(data.renderTime),
      }])     
    }

    socketRef.current.connect(roomId, userLogin).then(() => {
      socketRef.current?.getMessage(handleMessage);
      setIsConnected(true);
    })
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.leaveRoom();
      socketRef.current = null;
      setIsConnected(false);
      setMessages([])
    }
  }

  const formatTime = (date?: Date | string ) => {
    const dateObj = date 
      ? (typeof date === 'string' ? new Date(date) : date)
      : new Date();

    return dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  //!!!
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const logOut = async () => {
    const data = await LogOut();

    if (!data.success) {
      console.log('Пользователь не авторизован:', data.message);
      return;
    }
    localStorage.clear();
    navigate('/login')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    socketRef.current?.sendMessage(message);
    setMessages(prev => [...prev, { 
      message, 
      type: 'my', 
      userName: userLogin, 
      renderTime: formatTime(),
    }]);
    setMessage('');
  };

  return (
    <div className="home-container">
      <div className="servers-sidebar">
        {servers.map((server) => (
          <div key={server.name} className={`${server.name}-chat`}>
           <Server 
            serverId={server.serverId}
            name={server.name}
            disabled={isConnected} 
            onJoinServer={joinServer}
          />  
          </div>
        ))} 
      </div>
      <div className="chats-sidebar">
        {chats.map((chat) => (
          <div key={chat.name} className={`${chat.name}-chat`}>
           <Chat 
            chatId={chat.chatId}
            onJoinChat={connect}
            name={chat.name}
            disabled={isConnected} 
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
            <div key={index} className={`${msg.type}-message`}>
              <Message 
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
        image={test} 
        logOut={logOut}
      /> 
    </div>
  );
};

export default Home;