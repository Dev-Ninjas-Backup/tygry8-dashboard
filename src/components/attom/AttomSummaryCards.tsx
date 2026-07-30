"use client";

import React from "react";
import { Database, CheckCircle2, RefreshCw, Loader2 } from "lucide-react";
import { useAttomStats } from "../../hooks/useAttomQuery";

export const AttomSummaryCards: React.FC = () => {
  const { data, isLoading, isError, refetch } = useAttomStats();

  const summary = data ?? {
    totalProperties: 0,
    successfullyEnriched: 0,
    pendingSync: 0,
  };

  if (isError) {
    return (
      <div className="rounded-[22px] border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 px-4 py-3 text-xs text-rose-700 dark:text-rose-300 flex items-center justify-between gap-3">
        <span>Couldn&apos;t load ATTOM stats.</span>
        <button
          type="button"
          onClick={() => void refetch()}
          className="font-bold underline cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
      <div className="p-4 md:p-6 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#eff6ff] dark:bg-blue-950/60 text-[#3b82f6] dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 block truncate">
            Total Properties
          </span>
          <span className="text-xl md:text-2xl font-bold text-[#0f2347] dark:text-white tracking-tight mt-0.5 block">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            ) : (
              summary.totalProperties
            )}
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#e6f7ed] dark:bg-emerald-950/60 text-[#10b981] dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 block truncate">
            Enriched
          </span>
          <span className="text-xl md:text-2xl font-bold text-[#0f2347] dark:text-white tracking-tight mt-0.5 block">
            {isLoading ? "—" : summary.successfullyEnriched}
          </span>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-1 p-4 md:p-6 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fff7ed] dark:bg-amber-950/60 text-[#f59e0b] dark:text-amber-400 rounded-2xl flex items-center justify-center shrink-0">
          <RefreshCw className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 block truncate">
            Pending Sync
          </span>
          <span className="text-xl md:text-2xl font-bold text-[#0f2347] dark:text-white tracking-tight mt-0.5 block">
            {isLoading ? "—" : summary.pendingSync}
          </span>
        </div>
      </div>
    </div>
  );
};
