import { axiosInstance } from "../lib/axios";

export type NotificationType =
  | "INSPECTION_ISSUE"
  | "NEW_LEAD"
  | "OFFER_UPDATE"
  | "SYNC_FAILED"
  | "SYSTEM";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: Priority;
  isRead: boolean;
  userId?: string | null;
  leadId?: string | null;
  createdAt: string;
}

export const NotificationSocketEvents = {
  CREATED: "notification.created",
  UNREAD_COUNT: "notification.unread-count",
  READ: "notification.read",
} as const;

export const NOTIFICATIONS_NAMESPACE = "/notifications";

export async function getUnreadCount(): Promise<number> {
  const { data } = await axiosInstance.get("/api/notifications/unread-count");
  const value = data?.data ?? data;
  return typeof value === "number" ? value : value?.count ?? 0;
}

export async function getNotifications(params?: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}): Promise<{ data: Notification[]; meta?: Record<string, unknown> }> {
  const { data } = await axiosInstance.get("/api/notifications", { params });
  return {
    data: data?.data ?? [],
    meta: data?.meta,
  };
}

export async function markNotificationRead(id: string): Promise<Notification> {
  const { data } = await axiosInstance.patch(`/api/notifications/${id}/read`);
  return data?.data ?? data;
}

export async function markAllNotificationsRead(): Promise<void> {
  await axiosInstance.patch("/api/notifications/read-all");
}
