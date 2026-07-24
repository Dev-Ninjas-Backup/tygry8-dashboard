"use client";

import React from "react";
import Link from "next/link";
import { BellRing } from "lucide-react";
import type { OverviewAlert } from "../../services/overview.service";

interface PriorityAlertsProps {
  alerts?: OverviewAlert[];
  isLoading?: boolean;
}

export const PriorityAlerts: React.FC<PriorityAlertsProps> = ({
  alerts = [],
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs h-full">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BellRing className="w-4 h-4 text-amber-500 animate-bounce" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            High Priority Alerts
          </h3>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-400">Loading alerts…</p>
        ) : alerts.length === 0 ? (
          <p className="text-xs text-slate-400">No high-priority alerts.</p>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const body = (
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 transition-all hover:bg-amber-100/60 dark:hover:bg-amber-950/40">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-extrabold text-amber-900 dark:text-amber-300">
                        {alert.title}
                      </h4>
                      <p className="text-[11px] font-medium text-amber-700/80 dark:text-amber-400/80 mt-1 leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              );

              if (alert.leadId) {
                return (
                  <Link key={alert.id} href={`/leads/${alert.leadId}`}>
                    {body}
                  </Link>
                );
              }

              return <div key={alert.id}>{body}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
