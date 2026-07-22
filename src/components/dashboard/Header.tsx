"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Moon, Sun, Menu, ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  breadcrumbs?: BreadcrumbItem[];
}

export const Header: React.FC<HeaderProps> = ({
  onMobileMenuToggle,
  breadcrumbs = [
    { label: "Wisco Home Buyer", href: "/" },
    { label: "Dashboard" },
  ],
}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 md:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
                {isLast ? (
                  <span className="text-[#0f2347] dark:text-blue-400 font-bold underline underline-offset-4 decoration-2">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right: Actions (Notifications, Theme Toggle, User Avatar) */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Notification Bell */}
        <button
          className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors group"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="absolute top-2 right-2 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900">
            3
          </span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Vertical Separator */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* User Profile Avatar */}
        <button className="flex items-center gap-2 group p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="relative w-9 h-9 overflow-hidden rounded-full ring-2 ring-slate-200 dark:ring-slate-700 transition-all group-hover:ring-blue-500">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Naim Almas Avatar"
              fill
              className="object-cover"
            />
          </div>
        </button>
      </div>
    </header>
  );
};
