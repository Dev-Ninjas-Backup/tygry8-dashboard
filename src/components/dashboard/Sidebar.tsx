"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Database,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onMobileClose,
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      badge: null,
    },
    {
      name: "Leads",
      icon: Users,
      href: "/leads",
      badge: "7",
      badgeColor: "bg-red-500 text-white",
    },
    {
      name: "Properties",
      icon: Building2,
      href: "/properties",
      badge: null,
    },
    {
      name: "ATTOM Data",
      icon: Database,
      href: "/attom-data",
      badge: null,
    },
    {
      name: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 dark:border-slate-800/60">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Wisco Home Buyer Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider leading-tight text-[#0f2347] dark:text-white uppercase font-sans">
                WISCO
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-0.5">
                HOME BUYER
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onMobileClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-8">
          <div>
            <p className="px-3 mb-3 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              MENU
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onMobileClose?.()}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#0f2347] text-white shadow-md shadow-[#0f2347]/15 dark:bg-blue-600"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          item.badgeColor || "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Settings & Profile Section */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
          <Link
            href="/settings"
            onClick={() => onMobileClose?.()}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              pathname === "/settings"
                ? "bg-[#0f2347] text-white shadow-md shadow-[#0f2347]/15 dark:bg-blue-600"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          {/* User Card */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
            <div className="relative w-9 h-9">
              <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Naim Almas"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                Naim Almas
              </h4>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
