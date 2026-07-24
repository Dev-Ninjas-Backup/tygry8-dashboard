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
  taxYear,
}) => {
  return (
    <div className="p-6 md:p-8 bg-[#0f2347] text-white rounded-3xl border border-[#1e3a6a] shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 text-slate-300 pb-4 border-b border-white/10">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        <h3 className="text-sm font-extrabold tracking-wider uppercase text-white">
          Automated Valuation Model (AVM)
        </h3>
      </div>

      {/* Main Grid: Left Values & Right Confidence Score Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Valuation Breakdown (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-300/80 uppercase tracking-wider block">
              Estimated Value
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
              {avm.estimatedValue}
            </h2>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300/80">
                Tax Assessed{taxYear ? ` (${taxYear})` : ""}
              </span>
              <span className="font-extrabold text-white">{avm.taxAssessed}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300/80">
                Last Sold Price
              </span>
              <span className="font-extrabold text-white">{avm.lastSoldPrice}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300/80">
                Last Sold Date
              </span>
              <span className="font-extrabold text-white">{avm.lastSoldDate}</span>
            </div>
          </div>
        </div>

        {/* Right Confidence Score Inset Card (5 cols) */}
        <div className="md:col-span-5 p-5 bg-[#172e59] dark:bg-[#0b162f] rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-300/80 uppercase tracking-wider block">
              Confidence Score
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl md:text-4xl font-black text-emerald-400">
                {avm.confidenceScore}
              </span>
              <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          {/* Score Bar */}
          <div className="w-full h-2.5 bg-slate-900/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${avm.confidenceScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
