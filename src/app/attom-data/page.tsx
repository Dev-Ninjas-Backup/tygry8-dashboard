"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AttomSummaryCards } from "@/components/attom/AttomSummaryCards";
import { AttomTable } from "@/components/attom/AttomTable";
import { useSyncAllAttomMutation } from "@/hooks/useAttomQuery";
import { RefreshCw } from "lucide-react";

export default function AttomDataPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const syncAll = useSyncAllAttomMutation();

  return (
    <div className="flex min-h-screen bg-[#f4f6f8] dark:bg-[#0b1329]">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        <Header
          onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          breadcrumbs={[
            { label: "Wisco Home Buyer", href: "/" },
            { label: "ATTOM Data" },
          ]}
        />

        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Header & Sync All Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0f2347] dark:text-white tracking-tight">
                ATTOM Data Enrichment
              </h1>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">
                Manage property data API syncing and enrichment status.
              </p>
            </div>

            <div className="w-full sm:w-auto">
              <button
                type="button"
                onClick={() => syncAll.mutate()}
                disabled={syncAll.isPending}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0e1726] hover:bg-[#1a2942] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-xs transition-all disabled:opacity-75 cursor-pointer whitespace-nowrap"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${syncAll.isPending ? "animate-spin" : ""}`}
                />
                <span>
                  {syncAll.isPending ? "Syncing API..." : "Sync All Pending"}
                </span>
              </button>
            </div>
          </div>

          {/* 3 Summary Stat Cards */}
          <AttomSummaryCards />

          {/* Table */}
          <AttomTable />
        </main>
      </div>
    </div>
  );
}
