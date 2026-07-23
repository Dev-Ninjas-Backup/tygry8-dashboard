import React from "react";

export const LeadsTableSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-wider">
              <th className="pb-3 px-3">LEAD ID</th>
              <th className="pb-3 px-3">SELLER INFO</th>
              <th className="pb-3 px-3">PROPERTY</th>
              <th className="pb-3 px-3">STATUS</th>
              <th className="pb-3 px-3">PRIORITY</th>
              <th className="pb-3 px-3">SCORE</th>
              <th className="pb-3 px-3">ADDED</th>
              <th className="pb-3 px-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="py-4">
                {/* Lead ID */}
                <td className="py-4 px-3">
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                </td>

                {/* Seller Info */}
                <td className="py-4 px-3">
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                  </div>
                </td>

                {/* Property */}
                <td className="py-4 px-3">
                  <div className="space-y-1.5">
                    <div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="h-3 w-28 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-3">
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </td>

                {/* Priority Badge */}
                <td className="py-4 px-3">
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </td>

                {/* Score Bar */}
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-2 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="h-3 w-6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  </div>
                </td>

                {/* Added Date */}
                <td className="py-4 px-3">
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                </td>

                {/* Actions */}
                <td className="py-4 px-3 text-right">
                  <div className="h-7 w-14 bg-slate-200 dark:bg-slate-800 rounded-full ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
