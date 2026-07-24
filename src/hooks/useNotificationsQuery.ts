"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  Notification,
} from "../services/notifications.service";

export const NOTIFICATIONS_QUERY_KEY = "notifications";

export function useNotificationsList(enabled = true) {
  return useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, "list"],
    queryFn: () => getNotifications({ page: 1, limit: 20 }),
    enabled,
    staleTime: 30_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        [NOTIFICATIONS_QUERY_KEY, "list"],
        (prev: { data: Notification[] } | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: prev.data.map((n) => (n.id === updated.id ? updated : n)),
          };
        },
      );
      void queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.setQueryData(
        [NOTIFICATIONS_QUERY_KEY, "list"],
        (prev: { data: Notification[] } | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: prev.data.map((n) => ({ ...n, isRead: true })),
          };
        },
      );
      void queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    },
  });
}
