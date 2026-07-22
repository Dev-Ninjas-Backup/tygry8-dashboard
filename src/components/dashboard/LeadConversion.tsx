"use client";

import React from "react";

export interface ConversionItem {
  stage: string;
  count: string;
  percentage: number;
  barColor: string;
}

export const LeadConversion: React.FC = () => {
  const conversionData: ConversionItem[] = [
    {
      stage: "New Leads",
      count: "2,847",
      percentage: 100,
      barColor: "bg-[#0f2347] dark:bg-blue-600",
    },
    {
      stage: "Qualified",
      count: "1,623",
      percentage: 57,
      barColor: "bg-amber-500",
    },
    {
      stage: "Negotiation",
      count: "891",
      percentage: 31,
      barColor: "bg-purple-600",
    },
    {
      stage: "Closed",
      count: "891",
      percentage: 31,
      barColor: "bg-emerald-500",
    },
  ];

  return (
    <div className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs h-full">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Lead Conversion
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 mb-6">
          Current 30-day conversion metrics
        </p>

        <div className="space-y-6">
          {conversionData.map((item) => (
            <div key={item.stage} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {item.stage}
                </span>
                <div className="flex items-center gap-1 font-extrabold text-slate-900 dark:text-white">
                  <span>{item.count}</span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${item.barColor}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
