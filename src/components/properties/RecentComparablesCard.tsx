"use client";

import React from "react";
import { MapPin } from "lucide-react";

export interface ComparableSale {
  id: string;
  address: string;
  distance: string;
  soldDate: string;
  soldPrice: string;
}

export interface RecentComparablesCardProps {
  comparables: ComparableSale[];
}

export const RecentComparablesCard: React.FC<RecentComparablesCardProps> = ({
  comparables,
}) => {
  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-6">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        Recent Comparables
      </h3>

      {comparables.length === 0 ? (
        <p className="text-xs text-slate-400">No comparable sales available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-2">ADDRESS</th>
                <th className="pb-3 px-2">DISTANCE</th>
                <th className="pb-3 px-2">SOLD DATE</th>
                <th className="pb-3 px-2 text-right">SOLD PRICE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {comparables.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.address}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-2 font-medium text-slate-500 dark:text-slate-400">
                    {item.distance}
                  </td>

                  <td className="py-4 px-3 font-medium text-slate-500 dark:text-slate-400">
                    {item.soldDate}
                  </td>

                  <td className="py-4 px-2 text-right font-extrabold text-slate-900 dark:text-white">
                    {item.soldPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
