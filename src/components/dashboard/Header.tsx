"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Moon, Sun, Menu, ChevronRight, Settings } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const LogOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

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
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && typeof document !== "undefined" && document.documentElement.classList.contains("dark"));

    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

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
          onClick={toggleDarkMode}
          className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          )}
        </button>

        {/* Vertical Separator */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* User Profile Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="User Profile Menu"
            className="flex items-center gap-2 group p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <div className="relative w-9 h-9 overflow-hidden rounded-full ring-2 ring-slate-200 dark:ring-slate-700 transition-all group-hover:ring-blue-500 bg-[#0f2347] text-white flex items-center justify-center font-bold text-sm">
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name || user.email || "Admin User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                (user?.name?.[0] || user?.email?.[0] || "A").toUpperCase()
              )}
            </div>
          </button>

          {/* Profile Dropdown Menu Card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Profile Summary */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-[#0f2347] text-white flex items-center justify-center font-bold text-base overflow-hidden shrink-0">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name || user.email || "User Avatar"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    (user?.name?.[0] || user?.email?.[0] || "A").toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {user?.name || user?.firstName || user?.email?.split("@")[0] || "Admin User"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || "admin@wiscohomebuyer.com"}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 rounded-md uppercase tracking-wider">
                    {user?.role ? user.role.replace("_", " ") : "Super Admin"}
                  </span>
                </div>
              </div>

              {/* Menu Actions */}
              <div className="space-y-1">
                <Link
                  href="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
