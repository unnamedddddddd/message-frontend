export default interface NotificationsProps {
  notificationId: number;
  notificationType: 'friend_request' | 'invite';
  createdAt: string;
  referenceId: number;
  serverName: string;
  serverAvatar: string;  
  senderLogin: string;
  friendId: number;
  friendLogin: string;
  serverId: number;
  senderId: number;
  friendAvatar: string;
  onRemove?(id: number): void;
}