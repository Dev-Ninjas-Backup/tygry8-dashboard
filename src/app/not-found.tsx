"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Home, Layers, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#f4f6f8] dark:bg-[#0b1329] font-sans text-slate-900 dark:text-slate-100">
      {/* Top Logo */}
      <div className="mb-6 sm:mb-8">
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <div className="relative h-12 sm:h-14 w-44 sm:w-48">
            <Image
              src="/logo.png"
              alt="Wisco Home Buyer Logo"
              fill
              priority
              className="object-contain dark:brightness-0 dark:invert"
            />
          </div>
        </Link>
      </div>

      {/* 404 Standalone Card */}
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Emblem */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-[#0f2347] dark:text-blue-400 shadow-inner">
            <Building2 className="w-12 h-12 stroke-[1.5]" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#0f2347] dark:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md">
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2347] dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            The requested URL or property resource does not exist or may have been moved in our pipeline.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="w-full space-y-2.5 pt-2">
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl bg-[#0f2347] hover:bg-[#1a386d] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#0f2347]/15 flex items-center justify-center gap-2 group"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to Dashboard</span>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/leads"
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>View Leads</span>
            </Link>

            <Link
              href="/properties"
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
