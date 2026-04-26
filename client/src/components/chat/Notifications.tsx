import { updateStatusInviteServer } from "@/api/user";
import { SERVER_URL } from "@/config";
import { useNotification } from "@/hooks/chat/useNotification";
import type { NotificationsProps } from "@/types";

const Notifications = ({friendAvatar, friendLogin, serverId, senderLogin, senderId, serverAvatar, serverName, createdAt, referenceId, notificationType, onRemove, notificationId}: NotificationsProps) => {
  const { addNotification } = useNotification();

  const handleUpdateStatus = async (status: 'accepted' | 'declined') => {
    const response = await updateStatusInviteServer(status, referenceId, serverId, senderId);
    if (!response.success) {
      console.error(response.message);
      addNotification('error', response.message);
      return;
    }
    
    if (onRemove) {
      onRemove(notificationId);
    }
  }
 
  return (
    <div className="flex flex-col gap-1">
      {notificationType === 'invite' ? (
        <div className="flex gap-2 flex-col">
          <div className="flex  justify-between">
            <div className="flex gap-2 items-center">
              <img src={`${SERVER_URL}${serverAvatar}`} className="w-10 h-10 rounded-full"/>
              <span> {senderLogin} хочет зайти в {serverName}</span>
            </div>     
            <div className="flex gap-2 items-center">
              <button 
                className="p-2 rounded-2xl bg-[#353536]/70 border border-[#6d7275]/40 transition-all duration-200 hover:bg-[#414243]/90"
                onClick={() => handleUpdateStatus('accepted')}
              >
                ✔️
              </button>
              <button 
                className="p-2 rounded-2xl bg-[#353536]/70 border border-[#6d7275]/40 transition-all duration-200  hover:bg-[#414243]/90"
                onClick={() => handleUpdateStatus('declined')}
              >
                ❌
              </button>
            </div>          
          </div>
           <span className="text-sm text-gray-400 self-end mb-auto">{createdAt}</span>      
        </div>
      ) : (
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 items-center">
            <img src={friendAvatar} className="w-8 h-8 rounded-full"/>
            <span>{friendLogin} хочет добавить вас в друзья</span>
          </div>
          <span className="text-sm text-gray-400 self-end mb-auto">{createdAt}</span>
        </div>
      )}
    </div>
  );
};

export default Notifications;
