"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Wrench, X } from "lucide-react";

const AlertCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Maximize2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const RealEstatePlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
    <rect x="8" y="6" width="3" height="3" rx="0.5" />
    <rect x="13" y="6" width="3" height="3" rx="0.5" />
  </svg>
);

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
  otherRepairsNeeded?: string | null;
  photos: string[];
}

export interface PropertyDetailsCardProps {
  property: PropertySpec;
}

export const PropertyDetailsCard: React.FC<PropertyDetailsCardProps> = ({
  property,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = property.photos || [];

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : 0
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : 0
    );
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, photos.length]);

  // 3D Perspective CoverFlow Transformation Calculator
  const get3DStyle = (idx: number) => {
    if (lightboxIndex === null) return {};

    let diff = idx - lightboxIndex;
    const len = photos.length;

    // Normalize diff for infinite wrap-around
    if (len > 2) {
      if (diff > len / 2) diff -= len;
      if (diff < -len / 2) diff += len;
    }

    if (diff === 0) {
      // Active Center Photo: Front & center, 100% scale, 0deg 3D rotate
      return {
        transform: "translate3d(0%, 0, 0) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 30,
        filter: "brightness(1) blur(0px) drop-shadow(0 25px 25px rgba(0,0,0,0.6))",
        pointerEvents: "auto" as const,
      };
    } else if (diff === -1) {
      // Left Adjacent Photo: Shifted left in 3D perspective
      return {
        transform: "translate3d(-50%, 0, -180px) scale(0.8) rotateY(22deg)",
        opacity: 0.45,
        zIndex: 20,
        filter: "brightness(0.7) blur(1.5px)",
        pointerEvents: "auto" as const,
      };
    } else if (diff === 1) {
      // Right Adjacent Photo: Shifted right in 3D perspective
      return {
        transform: "translate3d(50%, 0, -180px) scale(0.8) rotateY(-22deg)",
        opacity: 0.45,
        zIndex: 20,
        filter: "brightness(0.7) blur(1.5px)",
        pointerEvents: "auto" as const,
      };
    } else {
      // Background hidden photos
      return {
        transform:
          diff < 0
            ? "translate3d(-100%, 0, -320px) scale(0.6) rotateY(35deg)"
            : "translate3d(100%, 0, -320px) scale(0.6) rotateY(-35deg)",
        opacity: 0,
        zIndex: 10,
        filter: "brightness(0.4) blur(4px)",
        pointerEvents: "none" as const,
      };
    }
  };

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

          {/* Other Repairs Needed */}
          {property.otherRepairsNeeded && (
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300 font-medium">
              <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Other Repairs Needed: </span>
                <span>{property.otherRepairsNeeded}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Property Photo Gallery Grid or Real Estate SVG Placeholder */}
      {photos.length > 0 ? (
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Property Gallery ({photos.length})
            </h4>
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              Click any photo to open 3D interactive slider
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {photos.map((url, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-4/3 rounded-2xl overflow-hidden group border border-slate-100 dark:border-slate-800 shadow-xs bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                <Image
                  src={url}
                  alt={`Property Photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-lg">
                    <Maximize2Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 md:p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-slate-400 dark:text-slate-500 shadow-xs">
            <RealEstatePlaceholderIcon className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
              No Property Photos Uploaded
            </h4>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
              Photos for this property submission have not been uploaded yet.
            </p>
          </div>
        </div>
      )}

      {/* 3D CoverFlow Lightbox Modal Slider Overlay */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-slate-950/80 dark:bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-300"
        >
          {/* Top Bar: Dark High-Contrast Badge Title & Close Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between max-w-7xl w-full mx-auto z-40"
          >
            {/* Dark Pill Badge for Title & Counter */}
            <div className="px-4 py-2 bg-slate-900/90 text-white rounded-2xl border border-slate-700/60 shadow-xl backdrop-blur-md flex items-center gap-3">
              <span className="text-sm font-black tracking-tight text-white">
                {property.address}
              </span>
              <span className="text-xs font-semibold text-slate-300 border-l border-slate-700 pl-3">
                Photo {lightboxIndex + 1} of {photos.length}
              </span>
            </div>

            {/* Dark Pill Close Button */}
            <button
              onClick={handleClose}
              className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full border border-slate-700/60 shadow-xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 3D Perspective CoverFlow Stage Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center my-2 max-w-6xl w-full mx-auto select-none [perspective:1200px] overflow-hidden"
          >
            {/* Left Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 md:left-6 z-40 p-3.5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full border border-slate-700/60 shadow-2xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>

            {/* 3D CoverFlow Carousel Cards Stage */}
            <div className="relative w-full h-[65vh] flex items-center justify-center [transform-style:preserve-3d]">
              {photos.map((url, idx) => {
                const style3D = get3DStyle(idx);
                return (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx);
                    }}
                    style={{
                      transform: style3D.transform,
                      opacity: style3D.opacity,
                      zIndex: style3D.zIndex,
                      filter: style3D.filter,
                      pointerEvents: style3D.pointerEvents,
                    }}
                    className="absolute w-full max-w-4xl h-full flex items-center justify-center transition-all duration-500 ease-out cursor-pointer"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={url}
                        alt={`Property Photo ${idx + 1}`}
                        fill
                        className="object-contain rounded-3xl"
                        priority={idx === lightboxIndex}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 md:right-6 z-40 p-3.5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full border border-slate-700/60 shadow-2xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip Pill Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2.5 bg-slate-900/90 border border-slate-700/60 shadow-2xl rounded-2xl backdrop-blur-md flex items-center justify-center gap-3 overflow-x-auto max-w-2xl w-full mx-auto scrollbar-none z-40"
          >
            {photos.map((url, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(idx);
                }}
                className={`relative w-14 h-11 md:w-16 md:h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  lightboxIndex === idx
                    ? "border-blue-500 scale-105 shadow-md shadow-blue-500/50 opacity-100"
                    : "border-slate-700/80 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
