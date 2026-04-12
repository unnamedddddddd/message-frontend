export default interface TextChatProps {
  chatId: number;
  name: string;
  disabled?: boolean;
  onJoinChat?: (chatId: number, friendId?: number, roomId?: string) => void;
}