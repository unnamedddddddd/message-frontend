export default interface TextChatProps {
  chatId: number;
  name: string;
  disabled?: boolean;
  type: 'server';
  onJoinChat?: (chatType: 'server' | 'personal', chatId: number, friendId?: number, roomId?: string) => void;
}