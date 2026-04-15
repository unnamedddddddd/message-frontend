export default interface FriendProps {
  id: number;
  friendId: number;
  name: string;
  avatar?: string;
  disabled?: boolean;
  online: boolean;
  onJoinChat?: (chatType: 'server' | 'personal', chatId: number, friendId?: number, roomId?: string) => void;
}

