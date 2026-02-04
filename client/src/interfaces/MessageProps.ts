export default interface MessageProps {
  type: 'my' | 'chat';
  message: string;
  userName: string;
  time?: string;
  senderId?: string;
}

