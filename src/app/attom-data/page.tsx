"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AttomSummaryCards } from "@/components/attom/AttomSummaryCards";
import { AttomTable } from "@/components/attom/AttomTable";

export default function AttomDataPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const summaryData = {
    totalProperties: 4,
    successfullyEnriched: 4,
    pendingSync: 0,
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6f8] dark:bg-[#0b1329]">
      {/* Sidebar Component */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Top Header */}
        <Header
          onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          breadcrumbs={[
            { label: "Wisco Home Buyer", href: "/" },
            { label: "ATTOM Data" },
          ]}
        />

        {/* Body Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          <AttomSummaryCards summary={summaryData} />
          <AttomTable />
        </main>
      </div>
    </div>
  );
}
