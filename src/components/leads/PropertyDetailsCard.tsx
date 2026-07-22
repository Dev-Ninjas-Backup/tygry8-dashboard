"use client";

import React from "react";
import Image from "next/image";
import { Home, Wrench } from "lucide-react";

export interface PropertySpec {
  address: string;
  cityStateZip: string;
  bedsBaths: string;
  sqft: string;
  yearBuilt: string;
  lotSize: string;
  roofCondition: string;
  kitchenCondition: string;
  bathroomCondition: string;
  foundationCondition: string;
  photos: string[];
}

export interface PropertyDetailsCardProps {
  property: PropertySpec;
}

export const PropertyDetailsCard: React.FC<PropertyDetailsCardProps> = ({
  property,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Specifications Card */}
      <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-8">
        {/* Card Section Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Home className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Property Details
          </h3>
        </div>

        {/* Property Address */}
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {property.address}
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            {property.cityStateZip}
          </p>
        </div>

        {/* 4 Spec Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Beds/Baths
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {property.bedsBaths}
            </span>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Square Feet
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {property.sqft}
            </span>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Year Built
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {property.yearBuilt}
            </span>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Lot Size
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {property.lotSize}
            </span>
          </div>
        </div>

        {/* Condition Report Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-400" />
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Condition Report
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs">
            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <span className="font-semibold text-slate-500 dark:text-slate-400 min-w-[80px]">
                Roof:
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {property.roofCondition}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <span className="font-semibold text-slate-500 dark:text-slate-400 min-w-[80px]">
                Kitchen:
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {property.kitchenCondition}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <span className="font-semibold text-slate-500 dark:text-slate-400 min-w-[80px]">
                Bathroom:
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {property.bathroomCondition}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <span className="font-semibold text-slate-500 dark:text-slate-400 min-w-[80px]">
                Foundation:
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {property.foundationCondition}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Photo Gallery Grid */}
      <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {property.photos.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-4/3 rounded-2xl overflow-hidden group border border-slate-100 dark:border-slate-800 shadow-xs"
            >
              <Image
                src={url}
                alt={`Property Photo ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
