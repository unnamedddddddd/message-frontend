export default interface FriendProps {
  id: number;
  friendId: number;
  name: string;
  avatar?: string;
  disabled?: boolean;
  onJoinChat?: (chatId: number, friendId?: number, roomId?: string) => void;
}

