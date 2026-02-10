export default interface TextChatProps {
  chatId: number;
  name: string;
  disabled?: boolean;
  onJoinChat?: (roomId: string, chatId: number) => void
}