import type { NotificationsProps, NotificationsResponseProps } from "@/types";
import formatTime from "./time";

const mapNotifications = (
  dbMessages: NotificationsResponseProps[], 
): NotificationsProps[] => {
  return dbMessages.map(ntf => ({
    notificationId: ntf.notification_id,
    notificationType: ntf.notification_type,
    referenceId: ntf.reference_id,
    createdAt: formatTime(ntf.created_at),
    serverId: ntf.server_id,
    serverAvatar: ntf.server_avatar,
    serverName: ntf.server_name,
    friendLogin: ntf.friend_login,
    friendAvatar: ntf.friend_avatar,
    senderId: ntf.sender_id,
    senderLogin: ntf.sender_login
  }));
}

export default mapNotifications;