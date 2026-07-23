"use client";

import React from "react";
import { BellRing } from "lucide-react";

export interface AlertItem {
  id: string;
  title: string;
  description: string;
}

export const PriorityAlerts: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      id: "1",
      title: "Inspection Issue",
      description: "889 Oak Ln, Milwaukee - Roof repair needed before closing.",
    },
    {
      id: "2",
      title: "Inspection Issue",
      description: "888 Oak Ln, Milwaukee - Roof repair needed before closing.",
    },
  ];

  return (
    <div className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs h-full">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BellRing className="w-4 h-4 text-amber-500 animate-bounce" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            High Priority Alerts
          </h3>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 transition-all hover:bg-amber-100/60 dark:hover:bg-amber-950/40"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-amber-900 dark:text-amber-300">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] font-medium text-amber-700/80 dark:text-amber-400/80 mt-1 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
