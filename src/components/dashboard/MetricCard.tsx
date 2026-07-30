"use client";

import React from "react";
import Image from "next/image";

export interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconSrc?: string;
  badgeText: string;
  badgeTrend?: "positive" | "negative" | "neutral";
  subtext: string;
  iconBgColor?: string;
  iconColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  iconSrc,
  badgeText,
  badgeTrend = "positive",
  subtext,
  iconBgColor = "bg-[#eef2f6] dark:bg-slate-800",
  iconColor = "text-slate-700 dark:text-slate-300",
}) => {
  return (
    <div className="flex flex-col justify-between p-4 md:p-5 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all duration-200">
      {/* Top Row: Title & SVG Icon Box */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs md:text-[13px] font-semibold text-slate-500 dark:text-slate-400 tracking-tight">
          {title}
        </span>
        <div
          className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-2xl ${iconBgColor} ${iconColor} transition-transform hover:scale-105 shrink-0`}
        >
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt={title}
              width={26}
              height={26}
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          ) : Icon ? (
            <Icon className="w-5 h-5" />
          ) : null}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-2 mb-4 flex items-baseline gap-1.5">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f2347] dark:text-white tracking-tight">
          {value}
        </h3>
        {unit && (
          <span className="text-xs md:text-sm font-normal text-slate-400 dark:text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {/* Bottom Row: Percentage/Value Pill & Subtext Context */}
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`px-2.5 py-0.5 font-bold rounded-md text-[11px] leading-tight ${
            badgeTrend === "positive"
              ? "bg-[#e6f7ed] text-[#15803D] dark:bg-emerald-950/60 dark:text-emerald-400"
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
