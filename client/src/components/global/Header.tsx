import { getNotifications } from "@/api/user";
import { SERVER_URL } from "@/config";
import { useAuth } from "@/hooks/user";
import type { NotificationsProps } from "@/types";
import { mapNotifications } from "@/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notiflication from "../chat/Notifications";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);
  const { userAvatar, userLogin } = useAuth();
  const navigate = useNavigate();
  
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 200);
  }

  const handleGetNotifications = async () => {
    setIsVisible(true);
    setIsOpen(true);

    const response = await getNotifications();
    if (!response.success) {
      console.error(response.message);
    }
    
    setNotifications(mapNotifications(response.notifications))
  }

  return (
      <header className="fixed z-50 left-0 top-0 right-0 h-10 bg-[#353536] flex items-center justify-between pl-5 pr-5 rounded-2xl m-2 mr-5 ml-5">
        <div>
          <span>Клон ДС</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="transition-all duration-200 p-1 rounded-2xl  hover:bg-[#414243]/90"
              onClick={isOpen ? handleClose : handleGetNotifications}
            >
              🔔
            </button>
            {isVisible && (
              <div className={`${isOpen ? 'notification-animation-open' : 'notification-animation-close'} absolute right-0 top-11 w-96 bg-[#2a2a2b] rounded-2xl shadow-xl p-3 flex-col gap-2`}>
                {notifications.map(notification => (
                  <div key={notification.notificationId}>
                    <Notiflication 
                      notificationId={notification.notificationId}
                      friendLogin={notification.friendLogin}
                      friendAvatar={notification.friendAvatar}
                      senderId={notification.senderId}
                      senderLogin={notification.senderLogin}
                      serverId={notification.serverId}
                      serverAvatar={notification.serverAvatar}
                      serverName={notification.serverName}
                      notificationType={notification.notificationType}
                      createdAt={notification.createdAt}
                      referenceId={notification.referenceId}
                      onRemove={(id) => setNotifications(prev => prev.filter(n => n.notificationId !== id))}
                     />
                  </div>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => navigate('/profile')}>
            <div className="flex items-center gap-4">
              <img 
                src={`${SERVER_URL}${userAvatar}`} 
                alt={`Аватар пользователя ${userLogin}`}  
                className="h-8 w-8 object-cover rounded-full border-2 border-white/10 transition-all duration-300"
              /> 
              <span>{userLogin}</span>
            </div>
          </button>
        </div>
      </header>
  );
};

export default Header;
