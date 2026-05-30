export default interface VoiceChatProps {
  chatId: number;
  name: string;
  disabled?: boolean;
  onJoinChat?: (roomId: string) => void
}