"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  badgeText: string;
  badgeTrend?: "positive" | "negative" | "neutral";
  subtext: string;
  iconBgColor?: string;
  iconColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  badgeText,
  badgeTrend = "positive",
  subtext,
  iconBgColor = "bg-slate-100 dark:bg-slate-800",
  iconColor = "text-slate-700 dark:text-slate-300",
}) => {
  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200">
      {/* Top Row: Title & Custom Badge Icon */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
          {title}
        </span>
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-2xl ${iconBgColor} ${iconColor} transition-transform hover:scale-105`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-2 mb-4">
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>

      {/* Bottom Row: Percentage Pill & Subtext Context */}
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`px-2.5 py-0.5 font-bold rounded-full text-[11px] ${
            badgeTrend === "positive"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
              : badgeTrend === "negative"
              ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {badgeText}
        </span>
        <span className="font-medium text-slate-400 dark:text-slate-500 truncate">
          {subtext}
        </span>
      </div>
    </div>
  );
};
