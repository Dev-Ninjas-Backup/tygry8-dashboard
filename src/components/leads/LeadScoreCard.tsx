"use client";

import React from "react";
import { Phone, Mail, Calendar } from "lucide-react";

export interface ContactInfo {
  phone: string;
  email: string;
  timeline: string;
}

export interface ValuationInfo {
  score: number;
  priority: "HIGH" | "MED" | "LOW";
  estValue: string;
}

export interface LeadScoreCardProps {
  contact: ContactInfo;
  valuation: ValuationInfo;
}

export const LeadScoreCard: React.FC<LeadScoreCardProps> = ({
  contact,
  valuation,
}) => {
  return (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <div className="p-6 md:p-7 bg-white dark:bg-slate-900 rounded-[22px] border border-slate-100/80 dark:border-slate-800/80 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[#0f2347] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Contact Info
        </h3>

        <div className="space-y-5">
          {/* Phone Item */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
                Phone
              </span>
              <a
                href={`tel:${contact.phone}`}
                className="text-xs font-bold text-[#0f2347] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Email Item */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-xs font-bold text-[#0f2347] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Timeline Item */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
                Timeline
              </span>
              <span className="text-xs font-bold text-[#0f2347] dark:text-white">
                {contact.timeline}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Lead Score & Valuation Card */}
      <div className="p-6 md:p-7 bg-[#0e1726] text-white rounded-[22px] border border-slate-800 shadow-md space-y-6">
        {/* Score Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Lead Score
            </h3>
            <p className="text-xs font-normal text-slate-400 mt-0.5">
              Based on ATTOM data & condition
            </p>
          </div>

          <span className="text-4xl font-extrabold text-[#10b981] tracking-tight">
            {valuation.score}
          </span>
        </div>

        {/* Priority Level */}
        <div className="pt-4 border-t border-white/10 space-y-1.5">
          <span className="text-xs font-semibold text-slate-400 block">
            Priority Level
          </span>
          <span className="inline-block px-3 py-1 bg-amber-500 text-amber-950 font-bold text-[10px] tracking-wider rounded-md uppercase">
            {valuation.priority}
          </span>
        </div>

        {/* Estimated Value (AVM) */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Est. Value (AVM)
          </span>
          <span className="text-lg font-bold text-white tracking-tight">
            {valuation.estValue}
          </span>
        </div>
      </div>
    </div>
  );
};
