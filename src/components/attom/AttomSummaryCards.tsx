"use client";

import React from "react";
import { Database, CheckCircle2, RefreshCw } from "lucide-react";

export interface AttomSummary {
  totalProperties: number;
  successfullyEnriched: number;
  pendingSync: number;
}

export interface AttomSummaryCardsProps {
  summary: AttomSummary;
}

export const AttomSummaryCards: React.FC<AttomSummaryCardsProps> = ({
  summary,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {/* Card 1: Total Properties */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Total Properties
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 block">
            {summary.totalProperties}
          </span>
        </div>
      </div>

      {/* Card 2: Successfully Enriched */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Successfully Enriched
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 block">
            {summary.successfullyEnriched}
          </span>
        </div>
      </div>

      {/* Card 3: Pending Sync */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0">
          <RefreshCw className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Pending Sync
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 block">
            {summary.pendingSync}
          </span>
        </div>
      </div>
    </div>
  );
};
