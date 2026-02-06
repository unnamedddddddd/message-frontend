export default interface ChatProps {
  chatId: number;
  name: string;
  disabled?: boolean;
  onJoinChat?: (roomId: string) => void
}