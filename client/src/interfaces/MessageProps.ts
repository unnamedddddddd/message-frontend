export default interface MessageProps {
  type: 'my' | 'chat';
  message: string;
  time?: Date;
  senderId?: string;
}

