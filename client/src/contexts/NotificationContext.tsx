import type { NotificationProps } from "@/types"
import { createContext } from "react";

type NotificationСontextType = {
  notifications: NotificationProps[ ];
  addNotification: (type: NotificationProps['type'], message: string) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationСontextType | undefined>(undefined);

export default NotificationContext;