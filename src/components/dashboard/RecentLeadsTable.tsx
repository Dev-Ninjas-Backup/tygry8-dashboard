"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Search, Eye, MoreHorizontal } from "lucide-react";
import type { OverviewRecentLead } from "../../services/overview.service";
import { formatCompactCurrency } from "../../services/overview.service";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://tygry8.saikat.com.bd";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300",
  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
];

function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function statusStyles(status: string) {
  switch (status) {
    case "REJECTED":
      return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400";
    case "NEGOTIATION":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
    case "CLOSED":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400";
    case "QUALIFIED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function priorityStyles(priority: string) {
  switch (priority) {
    case "HIGH":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
    case "MEDIUM":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function scoreStyles(score: number) {
  if (score >= 90)
    return "border-emerald-500 text-emerald-600 dark:text-emerald-400";
  if (score >= 75) return "border-amber-500 text-amber-600 dark:text-amber-400";
  return "border-blue-500 text-blue-600 dark:text-blue-400";
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatPriority(priority: string) {
  if (priority === "MEDIUM") return "MED";
  return priority;
}

interface RecentLeadsTableProps {
  leads?: OverviewRecentLead[];
  isLoading?: boolean;
}

export const RecentLeadsTable: React.FC<RecentLeadsTableProps> = ({
  leads = [],
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (lead) =>
        lead.sellerName.toLowerCase().includes(q) ||
        lead.property?.title?.toLowerCase().includes(q) ||
        lead.property?.city?.toLowerCase().includes(q) ||
        lead.leadNumber.toLowerCase().includes(q),
    );
  }, [leads, searchTerm]);

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Recent Leads
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Latest prospects entering the pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-48 pl-9 pr-4 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Link
            href="/leads"
            className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <p className="py-8 text-center text-xs text-slate-400">
            Loading recent leads…
          </p>
        ) : filteredLeads.length === 0 ? (
          <p className="py-8 text-center text-xs text-slate-400">
            No recent leads found.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-2">LEAD</th>
                <th className="pb-3 px-2">INTEREST</th>
                <th className="pb-3 px-2 text-center">SCORE</th>
                <th className="pb-3 px-2">STATUS</th>
                <th className="pb-3 px-2">PRIORITY</th>
                <th className="pb-3 px-2">VALUE</th>
                <th className="pb-3 px-2 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredLeads.map((lead, index) => {
                const timeAgo = (() => {
                  try {
                    return formatDistanceToNow(new Date(lead.submittedAt), {
                      addSuffix: true,
                    });
                  } catch {
                    return "";
                  }
                })();

                return (
                  <tr
                    key={lead.id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                            AVATAR_COLORS[index % AVATAR_COLORS.length]
                          }`}
                        >
                          {initials(lead.sellerName) || "L"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {lead.sellerName}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {timeAgo}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                          {resolveImageUrl(lead.property?.imageUrl) ? (
                            <Image
                              src={resolveImageUrl(lead.property?.imageUrl)!}
                              alt={lead.property?.title ?? "Property"}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 dark:text-slate-200">
                            {lead.property?.title ?? "Property"}
                          </h5>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {[lead.property?.city, lead.property?.state]
                              .filter(Boolean)
                              .join(", ") || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-2 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-xs ${scoreStyles(
                          lead.score,
                        )}`}
                      >
                        {lead.score}
                      </div>
                    </td>

                    <td className="py-4 px-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${statusStyles(
                          lead.status,
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {formatStatus(lead.status)}
                      </span>
                    </td>

                    <td className="py-4 px-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider ${priorityStyles(
                          lead.priority,
                        )}`}
                      >
                        {formatPriority(lead.priority)}
                      </span>
                    </td>

                    <td className="py-4 px-2 font-extrabold text-slate-900 dark:text-white">
                      {lead.estimatedValue != null
                        ? formatCompactCurrency(lead.estimatedValue)
                        : "—"}
                    </td>

                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          aria-label="View Lead"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          aria-label="More Options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
