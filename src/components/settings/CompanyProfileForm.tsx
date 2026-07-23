"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export const CompanyProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "WiscoHomeBuyer",
    supportEmail: "hello@wiscohomebuyer.com",
    phoneNumber: "(414) 555-0123",
    businessAddress: "100 E Wisconsin Ave, Milwaukee, WI 53202",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-8"
    >
      {/* Header */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          Company Profile
        </h3>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
          Update your business details and contact information.
        </p>
      </div>

      {/* Profile Photo Widget */}
      <div className="flex items-center gap-4 pt-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
            alt="Profile Avatar"
            fill
            className="object-cover"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 p-1 bg-emerald-500 text-white rounded-full border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform"
            aria-label="Upload Photo"
          >
            <Camera className="w-3 h-3" />
          </button>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
            Profile photo
          </h4>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
            JPG, GIF or PNG. 1MB max.
          </p>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="w-full px-4 py-3 text-xs font-semibold bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Support Email & Phone Number Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Support Email
            </label>
            <input
              type="email"
              value={formData.supportEmail}
              onChange={(e) =>
                setFormData({ ...formData, supportEmail: e.target.value })
              }
              className="w-full px-4 py-3 text-xs font-semibold bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full px-4 py-3 text-xs font-semibold bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Business Address */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Business Address
          </label>
          <input
            type="text"
            value={formData.businessAddress}
            onChange={(e) =>
              setFormData({ ...formData, businessAddress: e.target.value })
            }
            className="w-full px-4 py-3 text-xs font-semibold bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Save Action Row */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        {savedSuccess ? (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            ✓ Settings saved successfully!
          </span>
        ) : (
          <span />
        )}

        <button
          type="submit"
          className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f2347] hover:bg-[#1a366b] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-2xl shadow-md transition-all ml-auto"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
