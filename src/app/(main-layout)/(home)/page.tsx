"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { LeadConversion } from "@/components/dashboard/LeadConversion";
import { RecentLeadsTable } from "@/components/dashboard/RecentLeadsTable";
import { PriorityAlerts } from "@/components/dashboard/PriorityAlerts";

import { Users, Building2, Handshake, Clock } from "lucide-react";

export default function DashboardPage() {
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
        />

        {/* Dashboard Body Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Row: 4 Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <MetricCard
              title="Total Leads"
              value="2,847"
              icon={Users}
              badgeText="+18.2%"
              badgeTrend="positive"
              subtext="vs last month"
              iconBgColor="bg-slate-100 dark:bg-slate-800"
              iconColor="text-slate-700 dark:text-slate-300"
            />

            <MetricCard
              title="Active Pipeline"
              value="$4.2M"
              icon={Building2}
              badgeText="+12.5%"
              badgeTrend="positive"
              subtext="24 active deals"
              iconBgColor="bg-slate-100 dark:bg-slate-800"
              iconColor="text-slate-700 dark:text-slate-300"
            />

            <MetricCard
              title="Deal Closed"
              value="184"
              icon={Handshake}
              badgeText="+8.7%"
              badgeTrend="positive"
              subtext="This quarter"
              iconBgColor="bg-emerald-100/60 dark:bg-emerald-950/40"
              iconColor="text-emerald-600 dark:text-emerald-400"
            />

            <MetricCard
              title="Avg. Close Time"
              value="07.2 days"
              icon={Clock}
              badgeText="-2.1 days"
              badgeTrend="positive"
              subtext="improvement"
              iconBgColor="bg-amber-100/60 dark:bg-amber-950/40"
              iconColor="text-amber-600 dark:text-amber-400"
            />
          </div>

          {/* Middle Row: Revenue Chart (8 cols) & Lead Conversion (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8">
              <RevenueChart />
            </div>

            <div className="lg:col-span-4">
              <LeadConversion />
            </div>
          </div>

          {/* Bottom Row: Recent Leads Table (8 cols) & High Priority Alerts (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8">
              <RecentLeadsTable />
            </div>

            <div className="lg:col-span-4">
              <PriorityAlerts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}