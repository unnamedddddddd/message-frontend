export default interface ServerProps {
  image: string;
  name: string;
  disabled: boolean;
  onClick?: () => void;
  onJoinServer?: (serverId: string) => void
}