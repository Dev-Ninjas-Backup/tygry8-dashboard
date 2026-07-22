"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { PropertyDetailsCard } from "@/components/leads/PropertyDetailsCard";
import { LeadScoreCard } from "@/components/leads/LeadScoreCard";
import { ArrowLeft, ChevronDown } from "lucide-react";

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = (params?.id as string) || "L-1001";
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [status, setStatus] = useState("Negotiation");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Mock lead details
  const leadData = {
    id: leadId,
    sellerName: "Sarah Jenkins",
    statusBadge: "New",
    submittedAgo: "1 day ago",
    property: {
      address: "2451 N Murray Ave",
      cityStateZip: "Milwaukee, WI 53211",
      bedsBaths: "3 / 2",
      sqft: "1850",
      yearBuilt: "1924",
      lotSize: "0.15 acres",
      roofCondition: "Needs Replacement",
      kitchenCondition: "Outdated",
      bathroomCondition: "Functional",
      foundationCondition: "Solid",
      photos: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
      ],
    },
    contact: {
      phone: "(414) 555-0198",
      email: "sarah.j@example.com",
      timeline: "Immediately",
    },
    valuation: {
      score: 92,
      priority: "HIGH" as const,
      estValue: "$285,000",
    },
  };

  const statusOptions = ["New", "Contacted", "Negotiation", "Closed", "Rejected"];

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
            { label: "Dashboard", href: "/" },
            { label: leadData.sellerName },
          ]}
        />

        {/* Lead Detail Body */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Lead Back Bar & Status Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/leads"
                className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-xs transition-colors"
                aria-label="Back to Leads"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {leadData.sellerName}
                  </h1>
                  <span className="px-2.5 py-0.5 text-[11px] font-extrabold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-full">
                    {leadData.statusBadge}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                  {leadData.id} • Submitted {leadData.submittedAgo}
                </p>
              </div>
            </div>

            {/* Status Dropdown Selector */}
            <div className="relative self-start sm:self-auto">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xs transition-all"
              >
                <span>{status}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {statusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-20 space-y-1">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setStatus(opt);
                        setStatusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        status === opt
                          ? "bg-[#0f2347] text-white dark:bg-blue-600"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid Layout: Left Property Details (8 cols) & Right Lead Score/Contact (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <PropertyDetailsCard property={leadData.property} />
            </div>

            <div className="lg:col-span-4">
              <LeadScoreCard
                contact={leadData.contact}
                valuation={leadData.valuation}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
