"use client";

import React from "react";
import type { OverviewConversionStage } from "../../services/overview.service";

const STAGE_COLORS: Record<string, string> = {
  NEW: "bg-[#0f2347] dark:bg-blue-600",
  QUALIFIED: "bg-amber-500",
  NEGOTIATION: "bg-purple-600",
  CLOSED: "bg-emerald-500",
};

interface LeadConversionProps {
  stages?: OverviewConversionStage[];
  windowDays?: number;
  isLoading?: boolean;
}

export const LeadConversion: React.FC<LeadConversionProps> = ({
  stages = [],
  windowDays = 30,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs h-full">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Lead Conversion
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 mb-6">
          Current {windowDays}-day conversion metrics
        </p>

        {isLoading ? (
          <p className="text-xs text-slate-400">Loading conversion…</p>
        ) : stages.length === 0 ? (
          <p className="text-xs text-slate-400">No conversion data yet.</p>
        ) : (
          <div className="space-y-6">
            {stages.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1 font-extrabold text-slate-900 dark:text-white">
                    <span>{item.count.toLocaleString()}</span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      STAGE_COLORS[item.key] ?? "bg-slate-500"
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
