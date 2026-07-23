"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { CompanyProfileForm } from "@/components/settings/CompanyProfileForm";
import { UsersRolesTab } from "@/components/settings/UsersRolesTab";

export default function SettingsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "users">("profile");

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
            { label: "Settings" },
          ]}
        />

        {/* Body Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Page Header */}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Settings
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Manage your platform configuration and integrations.
            </p>
          </div>

          {/* Grid Layout: Left Tab Card & Right Form Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Tab Card (3 cols) */}
            <div className="lg:col-span-3 p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                  activeTab === "profile"
                    ? "bg-[#0f2347] text-white shadow-md shadow-[#0f2347]/15 dark:bg-blue-600"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => setActiveTab("users")}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                  activeTab === "users"
                    ? "bg-[#0f2347] text-white shadow-md shadow-[#0f2347]/15 dark:bg-blue-600"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Users & Roles
              </button>
            </div>

            {/* Right Form Card (9 cols) */}
            <div className="lg:col-span-9">
              {activeTab === "profile" ? (
                <CompanyProfileForm />
              ) : (
                <UsersRolesTab />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
