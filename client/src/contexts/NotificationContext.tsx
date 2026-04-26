import type { NotificationSystemProps } from "@/types"
import { createContext } from "react";

type NotificationСontextType = {
  notifications: NotificationSystemProps[ ];
  addNotification: (type: NotificationSystemProps['type'], message: string) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationСontextType | undefined>(undefined);

export default NotificationContext;