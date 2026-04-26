export default interface NotificationsResponseProps {
  notification_id: number
  notification_type: 'friend_request' | 'invite';
  created_at: string;
  reference_id: number;
  server_name: string;
  server_avatar: string;  
  friend_login: string;
  sender_login: string;
  server_id: number;
  sender_id: number;
  friend_avatar: string
}