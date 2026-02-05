export default interface ChatProps {
  name: string;
  disabled: boolean;
  onJoinChat?: (roomId: string) => void
}