export default interface MessageProps {
  type: 'my' | 'chat';
  message: string;
  userName: string;
  userAvatar: string;
  renderTime?: string;
  senderId?: string;
}

