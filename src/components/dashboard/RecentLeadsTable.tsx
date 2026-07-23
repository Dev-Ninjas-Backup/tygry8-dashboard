"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Eye, MoreHorizontal } from "lucide-react";

export interface LeadItem {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  avatarBg: string;
  timeAgo: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  score: number;
  scoreColor: string;
  status: "Rejected" | "Negotiation" | "Closed" | "New";
  statusColor: string;
  priority: "HIGH" | "MED" | "LOW";
  priorityColor: string;
  value: string;
}

export const RecentLeadsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const leadsData: LeadItem[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "",
      initials: "SJ",
      avatarBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
      timeAgo: "2h ago",
      propertyTitle: "3BR Colonial",
      propertyLocation: "Madison, WI",
      propertyImage:
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=150",
      score: 92,
      scoreColor: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
      status: "Rejected",
      statusColor: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
      priority: "HIGH",
      priorityColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
      value: "$485k",
    },
    {
      id: "2",
      name: "Marcus Chen",
      avatar: "",
      initials: "MC",
      avatarBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300",
      timeAgo: "1d ago",
      propertyTitle: "4BR Modern",
      propertyLocation: "Milwaukee, WI",
      propertyImage:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=150",
      score: 87,
      scoreColor: "border-amber-500 text-amber-600 dark:text-amber-400",
      status: "Negotiation",
      statusColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
      priority: "MED",
      priorityColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
      value: "$620k",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      avatar: "",
      initials: "ER",
      avatarBg: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      timeAgo: "3d ago",
      propertyTitle: "2BR Condo",
      propertyLocation: "Green Bay, WI",
      propertyImage:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=150",
      score: 74,
      scoreColor: "border-blue-500 text-blue-600 dark:text-blue-400",
      status: "Closed",
      statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
      priority: "LOW",
      priorityColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      value: "$285k",
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "",
      initials: "DK",
      avatarBg: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
      timeAgo: "30m ago",
      propertyTitle: "5BR Estate",
      propertyLocation: "Waukesha, WI",
      propertyImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=150",
      score: 96,
      scoreColor: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
      status: "Closed",
      statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
      priority: "HIGH",
      priorityColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
      value: "$1.2M",
    },
  ];

  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      {/* Header & Filter Controls */}
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
          {/* Search Box */}
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

          <button className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
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
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                {/* Lead Column */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${lead.avatarBg}`}
                    >
                      {lead.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lead.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {lead.timeAgo}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Interest Property Column */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={lead.propertyImage}
                        alt={lead.propertyTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-200">
                        {lead.propertyTitle}
                      </h5>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {lead.propertyLocation}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Score Column */}
                <td className="py-4 px-2 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-xs ${lead.scoreColor}`}
                  >
                    {lead.score}
                  </div>
                </td>

                {/* Status Column */}
                <td className="py-4 px-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${lead.statusColor}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {lead.status}
                  </span>
                </td>

                {/* Priority Column */}
                <td className="py-4 px-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider ${lead.priorityColor}`}
                  >
                    {lead.priority}
                  </span>
                </td>

                {/* Value Column */}
                <td className="py-4 px-2 font-extrabold text-slate-900 dark:text-white">
                  {lead.value}
                </td>

                {/* Actions Column */}
                <td className="py-4 px-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      aria-label="View Lead"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      aria-label="More Options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
