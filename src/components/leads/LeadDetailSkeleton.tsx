import React from "react";

export const LeadDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Lead Back Bar & Status Dropdown Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-3.5 w-36 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
          </div>
        </div>
        <div className="h-9 w-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>

      {/* Grid Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-8">
            <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="space-y-2">
              <div className="h-7 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
            </div>

            {/* 4 Tiles Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-2">
                  <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-md" />
                  <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-md" />
                </div>
              ))}
            </div>

            {/* Condition Report Skeleton */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-40 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                ))}
              </div>
            </div>
          </div>

          {/* Photo Gallery Skeleton */}
          <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-4/3 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="h-5 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#0f2347] rounded-3xl space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-white/20 rounded-md" />
                <div className="h-3 w-36 bg-white/10 rounded-md" />
              </div>
              <div className="h-10 w-12 bg-white/20 rounded-lg" />
            </div>
            <div className="h-12 w-full bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
