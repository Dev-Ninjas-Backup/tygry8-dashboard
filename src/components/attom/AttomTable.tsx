"use client";

import React, { useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";
import {
  useAttomEnrichments,
  useSyncAllAttomMutation,
  useSyncOneAttomMutation,
} from "../../hooks/useAttomQuery";
import type { EnrichmentStatus } from "../../services/attom.service";

function formatAvm(value: number | null): string {
  if (value == null) return "—";
  return `$${value.toLocaleString()}`;
}

function formatSynced(value: string | null): string {
  if (!value) return "Never";
  try {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  } catch {
    return "—";
  }
}

function statusBadge(status: EnrichmentStatus) {
  switch (status) {
    case "SUCCESS":
      return {
        label: "Success",
        className:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
        Icon: CheckCircle2,
      };
    case "FAILED":
      return {
        label: "Failed",
        className:
          "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
        Icon: AlertCircle,
      };
    default:
      return {
        label: "Pending",
        className:
          "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
        Icon: Clock,
      };
  }
}

export const AttomTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data = [], isLoading, isError, refetch } = useAttomEnrichments();
  const syncAll = useSyncAllAttomMutation();
  const syncOne = useSyncOneAttomMutation();

  const filteredRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (row) =>
        row.address.toLowerCase().includes(q) ||
        (row.leadNumber ?? "").toLowerCase().includes(q) ||
        row.propertyId.toLowerCase().includes(q),
    );
  }, [data, searchTerm]);

  const syncingId = syncOne.isPending ? syncOne.variables : null;

  return (
    <div className="space-y-6">
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
          type="button"
          onClick={() => syncAll.mutate()}
          disabled={syncAll.isPending}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0f2347] hover:bg-[#1a366b] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all self-start sm:self-auto disabled:opacity-75 cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${syncAll.isPending ? "animate-spin" : ""}`}
          />
          <span>
            {syncAll.isPending ? "Syncing API..." : "Sync All Pending"}
          </span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs p-4 md:p-6 space-y-6">
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

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-10 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading enrichments…
            </div>
          ) : isError ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-xs text-slate-400">
                Couldn&apos;t load ATTOM data.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : (
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
                  filteredRows.map((row) => {
                    const badge = statusBadge(row.status);
                    const StatusIcon = badge.Icon;
                    const isRowSyncing = syncingId === row.propertyId;

                    return (
                      <tr
                        key={row.propertyId}
                        className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-4 px-3">
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {row.address}
                            </h4>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                              {row.leadNumber ?? "—"}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${badge.className}`}
                            title={row.reason ?? undefined}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {badge.label}
                          </span>
                        </td>

                        <td className="py-4 px-3 font-extrabold text-slate-900 dark:text-white">
                          {formatAvm(row.avmMatch)}
                        </td>

                        <td className="py-4 px-3 font-medium text-slate-500 dark:text-slate-400">
                          {formatSynced(row.lastSyncedAt)}
                        </td>

                        <td className="py-4 px-3 text-right">
                          {row.status === "SUCCESS" ? (
                            <span className="font-medium text-slate-400 dark:text-slate-500">
                              Up to date
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => syncOne.mutate(row.propertyId)}
                              disabled={syncOne.isPending || syncAll.isPending}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors disabled:opacity-60 cursor-pointer"
                            >
                              {isRowSyncing ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <RefreshCw className="w-3.5 h-3.5" />
                              )}
                              Retry sync
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
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
          )}
        </div>
      </div>
    </div>
  );
};
