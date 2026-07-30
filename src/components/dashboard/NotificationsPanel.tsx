"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Bell, CheckCheck, Loader2 } from "lucide-react";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotificationsList,
} from "../../hooks/useNotificationsQuery";
import type { Notification, Priority } from "../../services/notifications.service";

interface NotificationsPanelProps {
  onClose: () => void;
}

const priorityDot: Record<Priority, string> = {
  HIGH: "bg-amber-500",
  MEDIUM: "bg-blue-500",
  LOW: "bg-slate-400",
};

function NotificationRow({
  notification,
  onSelect,
}: {
  notification: Notification;
  onSelect: (n: Notification) => void;
}) {
  const href = notification.leadId ? `/leads/${notification.leadId}` : undefined;
  const timeLabel = (() => {
    try {
      return formatDistanceToNow(new Date(notification.createdAt), {
        addSuffix: true,
      });
    } catch {
      return "";
    }
  })();

  const content = (
    <div
      className={`flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer ${
        notification.isRead
          ? "hover:bg-slate-50 dark:hover:bg-slate-800/60"
          : "bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40"
      }`}
    >
      <span
        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
          notification.isRead
            ? "bg-transparent"
            : priorityDot[notification.priority] || priorityDot.MEDIUM
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={`text-xs truncate ${
              notification.isRead
                ? "font-semibold text-slate-700 dark:text-slate-300"
                : "font-extrabold text-slate-900 dark:text-white"
            }`}
          >
            {notification.title}
          </h4>
          {notification.priority === "HIGH" && !notification.isRead && (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          )}
        </div>
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
          {notification.message}
        </p>
        {timeLabel && (
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1.5">
            {timeLabel}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={() => onSelect(notification)}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="w-full text-left" onClick={() => onSelect(notification)}>
      {content}
    </button>
  );
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  onClose,
}) => {
  const { data, isLoading, isError, refetch } = useNotificationsList(true);
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = data?.data ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  const handleSelect = (notification: Notification) => {
    if (!notification.isRead) {
      markRead.mutate(notification.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem] rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl dark:shadow-none z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Notifications
          </h3>
        </div>
        {hasUnread && (
          <button
            type="button"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 cursor-pointer"
          >
            {markAllRead.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCheck className="w-3.5 h-3.5" />
            )}
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-10 text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading…
          </div>
        )}

        {isError && (
          <div className="px-4 py-8 text-center space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Couldn&apos;t load notifications.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && notifications.length === 0 && (
          <div className="px-4 py-10 text-center">
            <Bell className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              You&apos;re all caught up
            </p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          notifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              onSelect={handleSelect}
            />
          ))}
      </div>
    </div>
  );
};
