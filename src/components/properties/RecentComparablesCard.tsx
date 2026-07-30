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
  comparables?: ComparableSale[];
}

export const RecentComparablesCard: React.FC<RecentComparablesCardProps> = ({
  comparables = [],
}) => {
  return (
    <div className="p-6 md:p-7 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs space-y-5">
      <h3 className="text-lg font-bold text-[#0f2347] dark:text-white">
        Recent Comparables
      </h3>

      {comparables.length === 0 ? (
        <p className="py-6 text-center text-xs font-medium text-slate-400 dark:text-slate-500">
          No comparable sales available for this property.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-2">ADDRESS</th>
                <th className="pb-3 px-2">DISTANCE</th>
                <th className="pb-3 px-2">SOLD DATE</th>
                <th className="pb-3 px-2 text-right">SOLD PRICE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs md:text-sm">
              {comparables.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="font-bold text-[#0f2347] dark:text-slate-100">
                        {item.address}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-2 font-normal text-slate-500 dark:text-slate-400">
                    {item.distance}
                  </td>

                  <td className="py-4 px-2 font-normal text-slate-500 dark:text-slate-400">
                    {item.soldDate}
                  </td>

                  <td className="py-4 px-2 text-right font-bold text-[#0f2347] dark:text-white">
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
