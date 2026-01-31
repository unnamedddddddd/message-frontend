export default interface ChatProps {
  image: string;
  name: string;
  disabled: boolean;
  onClick?: () => void;
  onJoinRoom?: (roomId: string) => void
}