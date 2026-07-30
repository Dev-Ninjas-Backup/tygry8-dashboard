"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

export interface AvmMetrics {
  estimatedValue: string;
  taxAssessed: string;
  lastSoldPrice: string;
  lastSoldDate: string;
  confidenceScore: number;
}

export interface AvmValuationCardProps {
  avm: AvmMetrics;
  taxYear?: number | null;
}

export const AvmValuationCard: React.FC<AvmValuationCardProps> = ({
  avm,
  taxYear = 2025,
}) => {
  return (
    <div className="p-6 md:p-7 bg-[#0e1726] dark:bg-[#0b1329] text-white rounded-[22px] border border-slate-800 shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 text-slate-300">
        <TrendingUp className="w-5 h-5 text-slate-300" />
        <h3 className="text-sm font-semibold tracking-wide text-slate-200">
          Automated Valuation Model (AVM)
        </h3>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Breakdown (7 cols) */}
        <div className="md:col-span-7 space-y-5">
          <div>
            <span className="text-xs font-medium text-slate-400 block">
              Estimated Value
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
              {avm.estimatedValue}
            </h2>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex items-center justify-between">
              <span className="font-normal text-slate-400">
                Tax Assessed{taxYear ? ` (${taxYear})` : ""}
              </span>
              <span className="font-bold text-white">{avm.taxAssessed}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-normal text-slate-400">Last Sold Price</span>
              <span className="font-bold text-white">{avm.lastSoldPrice}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-normal text-slate-400">Last Sold Date</span>
              <span className="font-bold text-white">{avm.lastSoldDate}</span>
            </div>
          </div>
        </div>

        {/* Right Confidence Score Inset Card (5 cols) */}
        <div className="md:col-span-5 p-5 bg-[#182338] dark:bg-[#080d1e] rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-medium text-slate-300 block">
              Confidence Score
            </span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-3xl md:text-4xl font-extrabold text-[#10b981]">
                {avm.confidenceScore}
              </span>
              <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#0f172a] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#10b981] transition-all duration-500"
              style={{ width: `${avm.confidenceScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
