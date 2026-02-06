export default interface ServerProps {
  image?: string;
  serverId: number;
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  onJoinServer?: (serverId: number) => void
}