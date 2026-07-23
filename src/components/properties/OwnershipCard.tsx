"use client";

import React from "react";

export interface OwnershipDetails {
  ownerName: string;
  ownerType: string;
  occupancyStatus: string;
}

export interface OwnershipCardProps {
  ownership: OwnershipDetails;
}

export const OwnershipCard: React.FC<OwnershipCardProps> = ({ ownership }) => {
  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-6">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        Ownership
      </h3>

      <div className="space-y-5">
        {/* Owner Name(s) */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Owner Name(s)
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 block">
            {ownership.ownerName}
          </span>
        </div>

        {/* Owner Type */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Owner Type
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 block">
            {ownership.ownerType}
          </span>
        </div>

        {/* Occupancy Status */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Occupancy Status
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 block">
            {ownership.occupancyStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
