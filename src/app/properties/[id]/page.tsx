"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AvmValuationCard } from "@/components/properties/AvmValuationCard";
import { RecentComparablesCard } from "@/components/properties/RecentComparablesCard";
import { OwnershipCard } from "@/components/properties/OwnershipCard";
import { ArrowLeft, Layers } from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = (params?.id as string) || "1";
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Mock Property ATTOM Data
  const propertyData = {
    id: propertyId,
    address: "2451 N Murray Ave",
    cityStateZip: "Milwaukee, WI 53211",
    avm: {
      estimatedValue: "$285,000",
      taxAssessed: "$242,250",
      lastSoldPrice: "$171,000",
      lastSoldDate: "Jul 2021",
      confidenceScore: 87,
    },
    ownership: {
      ownerName: "Redacted for Privacy",
      ownerType: "Individual",
      occupancyStatus: "Owner Occupied",
    },
    comparables: [
      {
        id: "1",
        address: "8893 Nearby St",
        distance: "0.92 miles",
        soldDate: "Apr 2, 2026",
        soldPrice: "$264,693",
      },
      {
        id: "2",
        address: "1786 Nearby St",
        distance: "1.36 miles",
        soldDate: "May 11, 2026",
        soldPrice: "$273,759",
      },
      {
        id: "3",
        address: "6724 Nearby St",
        distance: "0.5 miles",
        soldDate: "Feb 10, 2026",
        soldPrice: "$295,682",
      },
    ],
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
            { label: "Properties & ATTOM Data", href: "/properties" },
            { label: propertyData.address },
          ]}
        />

        {/* Body Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Navigation Bar */}
          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-xs transition-colors"
              aria-label="Back to Properties"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {propertyData.address}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full">
                  <Layers className="w-3 h-3" />
                  ATTOM Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                {propertyData.cityStateZip}
              </p>
            </div>
          </div>

          {/* Grid Layout: Left AVM & Comparables (8 cols) & Right Ownership (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              <AvmValuationCard avm={propertyData.avm} />
              <RecentComparablesCard comparables={propertyData.comparables} />
            </div>

            <div className="lg:col-span-4">
              <OwnershipCard ownership={propertyData.ownership} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
