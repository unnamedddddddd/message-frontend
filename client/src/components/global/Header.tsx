import { useAuth } from "@/hooks/user";
import type { NotificationsProps } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notiflication from "../chat/Notifications/Notifications";
import { getNotifications } from "@/api/user/get";
import { mapNotifications } from "@/utils/map";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);
  const { userAvatar, userLogin, logOut } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 200);
  }

  const handleGetNotifications = async () => {
    if (isOpen) {
      handleClose();
      return;
    }
    setIsVisible(true);
    setIsOpen(true);

    try {
      const response = await getNotifications();
      if (!response.success) {
        console.error(response.message);
        return; 
      }
      setNotifications(mapNotifications(response.notifications));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button')) return;
      if (!target.closest('.notifications-wrapper')) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className="h-10 bg-[#0d0d0f]/75 backdrop-blur-md border border-white/[0.06] flex items-center justify-between px-4 rounded-xl z-50">
      <div>
        <span className="font-bold text-sm tracking-[0.14em] uppercase text-white/60">Droksid</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="transition-all duration-200 p-1 rounded-2xl  hover:bg-[#414243]/90"
            onClick={isOpen ? handleClose : handleGetNotifications}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="currentColor" className="text-[#a3a2a3] hover:text-white transition-colors">
              <path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z" />
            </svg>
          </button>
          {isVisible && (
            <div className={`${isOpen ? 'notification-animation-open' : 'notification-animation-close'} absolute right-0 top-11 w-96 bg-[#0d0d0f]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-2xl p-3 flex-col gap-2`}>
              {notifications.length === 0 ? (
                <div className="flex justify-center items-center flex-col p-2">
                  <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 48 48" fill="none">
                      <path d="M44 24V9H24H4V24V39H24" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M40 31L32 39" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M32 31L40 39" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M4 9L24 24L44 9" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#949ba4] text-sm font-medium">
                    Упс... у вас нет новых сообщнений
                  </span>
                </div>
              )
                :
                notifications.map(notification => (
                  <div key={notification.notificationId}>
                    <Notiflication
                      notificationId={notification.notificationId}
                      friendId={notification.friendId}
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
              src={userAvatar}
              alt={`Аватар пользователя ${userLogin}`}
              className="h-8 w-8 object-cover rounded-full border-2 border-white/10 transition-all duration-300"
            />
            <span>{userLogin}</span>
          </div>
        </button>
        <button
          className="flex justify-center items-center p-2 rounded-xl hover:bg-[#414243]/90 transition-all duration-200"
          onClick={logOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.333 533.333"
            style={{ width: 24, height: 24 }}
            fill="#a3a2a3"
          >
            <path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;