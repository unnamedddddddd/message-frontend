export default interface ServerProps {
  avatar?: string;
  serverId: number;
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  onJoinServer?: (serverId: number) => void
}