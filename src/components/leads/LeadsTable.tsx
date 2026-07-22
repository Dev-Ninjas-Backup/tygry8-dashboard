"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Download, Filter } from "lucide-react";

export interface LeadSubmission {
  id: string;
  leadId: string;
  sellerName: string;
  sellerPhone: string;
  propertyAddress: string;
  propertyCity: string;
  status: "New" | "Contacted" | "Rejected" | "Closed";
  priority: "High" | "Medium" | "Low";
  score: number;
  added: string;
}

export const LeadsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const initialLeads: LeadSubmission[] = [
    {
      id: "1",
      leadId: "L-1001",
      sellerName: "Sarah Jenkins",
      sellerPhone: "(414) 555-0198",
      propertyAddress: "2451 N Murray Ave",
      propertyCity: "Milwaukee",
      status: "New",
      priority: "High",
      score: 92,
      added: "1 day ago",
    },
    {
      id: "2",
      leadId: "L-1002",
      sellerName: "Marcus Thorne",
      sellerPhone: "(608) 555-0234",
      propertyAddress: "1802 E Johnson St",
      propertyCity: "Madison",
      status: "Contacted",
      priority: "Medium",
      score: 75,
      added: "3 days ago",
    },
    {
      id: "3",
      leadId: "L-1003",
      sellerName: "David & Lisa Chen",
      sellerPhone: "(920) 555-0878",
      propertyAddress: "845 S Webster Ave",
      propertyCity: "Green Bay",
      status: "Rejected",
      priority: "High",
      score: 88,
      added: "7 days ago",
    },
    {
      id: "4",
      leadId: "L-1004",
      sellerName: "Robert Vance",
      sellerPhone: "(262) 555-0441",
      propertyAddress: "4212 80th St",
      propertyCity: "Kenosha",
      status: "Closed",
      priority: "Low",
      score: 45,
      added: "15 days ago",
    },
  ];

  const filteredLeads = initialLeads.filter((lead) => {
    const matchesSearch =
      lead.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.leadId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeStatusFilter === "All" || lead.status === activeStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvHeader =
      "Lead ID,Seller Name,Phone,Address,City,Status,Priority,Score,Added\n";
    const csvRows = filteredLeads
      .map(
        (l) =>
          `"${l.leadId}","${l.sellerName}","${l.sellerPhone}","${l.propertyAddress}","${l.propertyCity}","${l.status}","${l.priority}","${l.score}","${l.added}"`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wisco_leads_export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: LeadSubmission["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300";
      case "Contacted":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
      case "Rejected":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400";
      case "Closed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const getPriorityBadge = (priority: LeadSubmission["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
      case "Low":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return { bar: "bg-emerald-500", text: "text-slate-800 dark:text-slate-200" };
    if (score >= 60) return { bar: "bg-amber-500", text: "text-slate-800 dark:text-slate-200" };
    return { bar: "bg-rose-500", text: "text-slate-800 dark:text-slate-200" };
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Export Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Leads
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Manage and track your property submissions.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export</span>
        </button>
      </div>

      {/* Main Table Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs p-4 md:p-6 space-y-6">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl border transition-all ${
                activeStatusFilter !== "All"
                  ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeStatusFilter !== "All" && (
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </button>

            {/* Filter Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-20 space-y-1">
                <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Filter by Status
                </p>
                {["All", "New", "Contacted", "Rejected", "Closed"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setActiveStatusFilter(status);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        activeStatusFilter === status
                          ? "bg-[#0f2347] text-white dark:bg-blue-600"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
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
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => {
                  const scoreStyle = getScoreColor(lead.score);
                  return (
                    <tr
                      key={lead.id}
                      className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Lead ID */}
                      <td className="py-4 px-3 font-bold text-slate-900 dark:text-white">
                        {lead.leadId}
                      </td>

                      {/* Seller Info */}
                      <td className="py-4 px-3">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {lead.sellerName}
                          </h4>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                            {lead.sellerPhone}
                          </p>
                        </div>
                      </td>

                      {/* Property */}
                      <td className="py-4 px-3">
                        <div>
                          <h5 className="font-bold text-slate-800 dark:text-slate-200">
                            {lead.propertyAddress}
                          </h5>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                            {lead.propertyCity}
                          </p>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Priority Badge */}
                      <td className="py-4 px-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${getPriorityBadge(
                            lead.priority
                          )}`}
                        >
                          {lead.priority}
                        </span>
                      </td>

                      {/* Score Indicator Bar & Number */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${scoreStyle.bar}`}
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                          <span
                            className={`font-extrabold text-xs ${scoreStyle.text}`}
                          >
                            {lead.score}
                          </span>
                        </div>
                      </td>

                      {/* Added Time */}
                      <td className="py-4 px-3 font-medium text-slate-500 dark:text-slate-400">
                        {lead.added}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-3 text-right">
                        <Link
                          href={`/leads/${lead.leadId}`}
                          className="inline-block px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-slate-400 font-medium"
                  >
                    No leads found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing {filteredLeads.length} leads
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-4 py-1.5 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-full cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-4 py-1.5 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-full cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
