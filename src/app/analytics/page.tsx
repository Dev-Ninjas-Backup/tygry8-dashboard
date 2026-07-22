"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { RevenueTrendChart } from "@/components/analytics/RevenueTrendChart";
import { LeadsVsDealsChart } from "@/components/analytics/LeadsVsDealsChart";
import { PriorityDonutChart } from "@/components/analytics/PriorityDonutChart";

export default function AnalyticsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
            { label: "Analytics" },
          ]}
        />

        {/* Body Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Page Header */}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Analytics
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Deep dive into your lead generation metrics.
            </p>
          </div>

          {/* Top Grid Row: Revenue Trend & Leads vs Closed Deals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <RevenueTrendChart />
            </div>

            <div className="lg:col-span-6">
              <LeadsVsDealsChart />
            </div>
          </div>

          {/* Bottom Grid Row: Priority Distribution Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <PriorityDonutChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
