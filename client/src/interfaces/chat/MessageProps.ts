export default interface MessageProps {
  type: 'my' | 'chat';
  message: string;
  userName: string;
  renderTime?: string;
  senderId?: string;
}

