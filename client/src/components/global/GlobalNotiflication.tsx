import Notiflication from "../chat/Notiflication";
import { useNotification } from "@/hooks/chat/useNotification";

const GlobalNotiflication = () => {
  const {
    notifications,
    removeNotification
  } = useNotification()

  return (
    <div className="fixed top-5 right-5 z-[2000] flex flex-col gap-3 pointer-events-none">
      {notifications.map(notif => (
        <div 
          key={notif.notificationId} 
          className="pointer-events-auto animate-in fade-in slide-in-from-right-10 duration-300"
        >
          <Notiflication
            type={notif.type} 
            message={notif.message} 
            onClose={() => removeNotification(notif.notificationId)} 
            notificationId={notif.notificationId} 
          />
        </div>
      ))}
    </div>
  );
};

export default GlobalNotiflication;
