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
    <div className="p-6 md:p-7 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs space-y-5 h-full">
      <h3 className="text-lg font-bold text-[#0f2347] dark:text-white">
        Ownership
      </h3>

      <div className="space-y-4 pt-1">
        {/* Owner Name(s) */}
        <div>
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500 block">
            Owner Name(s)
          </span>
          <span className="text-sm font-bold text-[#0f2347] dark:text-white mt-0.5 block">
            {ownership.ownerName || "Redacted for Privacy"}
          </span>
        </div>

        {/* Owner Type */}
        <div>
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500 block">
            Owner Type
          </span>
          <span className="text-sm font-bold text-[#0f2347] dark:text-white mt-0.5 block">
            {ownership.ownerType || "Individual"}
          </span>
        </div>

        {/* Occupancy Status */}
        <div>
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500 block">
            Occupancy Status
          </span>
          <span className="text-sm font-bold text-[#0f2347] dark:text-white mt-0.5 block">
            {ownership.occupancyStatus || "Owner Occupied"}
          </span>
        </div>
      </div>
    </div>
  );
};
