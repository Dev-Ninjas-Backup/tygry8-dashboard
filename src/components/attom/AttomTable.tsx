"use client";

import React, { useState } from "react";
import { Search, RefreshCw, CheckCircle2 } from "lucide-react";

export interface AttomRow {
  id: string;
  leadId: string;
  address: string;
  status: "Success" | "Pending" | "Failed";
  avmMatch: string;
  lastSynced: string;
}

export interface AttomTableProps {
  onSyncAll?: () => void;
}

export const AttomTable: React.FC<AttomTableProps> = ({ onSyncAll }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const initialRows: AttomRow[] = [
    {
      id: "1",
      leadId: "L-1001",
      address: "2451 N Murray Ave",
      status: "Success",
      avmMatch: "$285,000",
      lastSynced: "Just now",
    },
    {
      id: "2",
      leadId: "L-1002",
      address: "1802 E Johnson St",
      status: "Success",
      avmMatch: "$420,000",
      lastSynced: "Just now",
    },
    {
      id: "3",
      leadId: "L-1003",
      address: "845 S Webster Ave",
      status: "Success",
      avmMatch: "$175,000",
      lastSynced: "Just now",
    },
    {
      id: "4",
      leadId: "L-1004",
      address: "4212 80th St",
      status: "Success",
      avmMatch: "$210,000",
      lastSynced: "Just now",
    },
  ];

  const filteredRows = initialRows.filter(
    (r) =>
      r.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.leadId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTriggerSync = () => {
    setIsSyncing(true);
    onSyncAll?.();
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Sync All Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ATTOM Data Enrichment
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Manage property data API syncing and enrichment status.
          </p>
        </div>

        <button
          onClick={handleTriggerSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0f2347] hover:bg-[#1a366b] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all self-start sm:self-auto disabled:opacity-75"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`}
          />
          <span>{isSyncing ? "Syncing API..." : "Sync All Pending"}</span>
        </button>
      </div>

      {/* Main Table Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs p-4 md:p-6 space-y-6">
        {/* Toolbar Search Box */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by address or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ATTOM Sync Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-3">PROPERTY</th>
                <th className="pb-3 px-3">STATUS</th>
                <th className="pb-3 px-3">AVM MATCH</th>
                <th className="pb-3 px-3">LAST SYNCED</th>
                <th className="pb-3 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Property Address & Lead ID */}
                    <td className="py-4 px-3">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {row.address}
                        </h4>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                          {row.leadId}
                        </p>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {row.status}
                      </span>
                    </td>

                    {/* AVM Match */}
                    <td className="py-4 px-3 font-extrabold text-slate-900 dark:text-white">
                      {row.avmMatch}
                    </td>

                    {/* Last Synced */}
                    <td className="py-4 px-3 font-medium text-slate-500 dark:text-slate-400">
                      {row.lastSynced}
                    </td>

                    {/* Actions (Up to date text) */}
                    <td className="py-4 px-3 text-right font-medium text-slate-400 dark:text-slate-500">
                      Up to date
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-400 font-medium"
                  >
                    No properties found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
