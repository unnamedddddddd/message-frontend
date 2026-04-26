export default interface NotificationSystemProps {
  notificationId: number;
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  visible?: boolean;
  onClose?(): void;
}