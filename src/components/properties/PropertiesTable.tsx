"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Map, Layers, MapPin } from "lucide-react";

export interface PropertyItem {
  id: string;
  leadId: string;
  address: string;
  cityStateZip: string;
  beds: number;
  estValue: string;
  taxAssessed: string;
  enrichment: "Enriched" | "Pending";
}

export const PropertiesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMapView, setIsMapView] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("1");

  const propertiesData: PropertyItem[] = [
    {
      id: "1",
      leadId: "L-1001",
      address: "2451 N Murray Ave",
      cityStateZip: "Milwaukee, WI 53211",
      beds: 3,
      estValue: "$285,000",
      taxAssessed: "$242,250",
      enrichment: "Enriched",
    },
    {
      id: "2",
      leadId: "L-1002",
      address: "1802 E Johnson St",
      cityStateZip: "Madison, WI 53704",
      beds: 4,
      estValue: "$420,000",
      taxAssessed: "$357,000",
      enrichment: "Enriched",
    },
    {
      id: "3",
      leadId: "L-1003",
      address: "845 S Webster Ave",
      cityStateZip: "Green Bay, WI 54301",
      beds: 3,
      estValue: "$175,000",
      taxAssessed: "$148,750",
      enrichment: "Enriched",
    },
    {
      id: "4",
      leadId: "L-1004",
      address: "4212 80th St",
      cityStateZip: "Kenosha, WI 53144",
      beds: 2,
      estValue: "$210,000",
      taxAssessed: "$178,500",
      enrichment: "Enriched",
    },
  ];

  const filteredProperties = propertiesData.filter(
    (p) =>
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cityStateZip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeProperty =
    propertiesData.find((p) => p.id === selectedPropertyId) ||
    propertiesData[0];

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Properties & ATTOM Data
        </h1>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
          View property details and enriched market data.
        </p>
      </div>

      {/* Main Table / Map View Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs p-4 md:p-6 space-y-6">
        {/* Toolbar Row */}
        {!isMapView && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Map View Toggle Button */}
            <button
              onClick={() => setIsMapView(!isMapView)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              <Map className="w-3.5 h-3.5 text-slate-500" />
              <span>Map View</span>
            </button>
          </div>
        )}

        {/* Content View: Table Mode or Interactive Side-by-Side Map Mode */}
        {!isMapView ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 px-3">ADDRESS</th>
                  <th className="pb-3 px-3">SPECS</th>
                  <th className="pb-3 px-3">EST. VALUE (AVM)</th>
                  <th className="pb-3 px-3">TAX ASSESSED</th>
                  <th className="pb-3 px-3">ENRICHMENT</th>
                  <th className="pb-3 px-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Address */}
                      <td className="py-4 px-3">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.address}
                          </h4>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                            {item.cityStateZip}
                          </p>
                        </div>
                      </td>

                      {/* Specs */}
                      <td className="py-4 px-3 font-bold text-slate-800 dark:text-slate-200">
                        {item.beds}
                      </td>

                      {/* Est. Value (AVM) */}
                      <td className="py-4 px-3 font-extrabold text-slate-900 dark:text-white">
                        {item.estValue}
                      </td>

                      {/* Tax Assessed */}
                      <td className="py-4 px-3 font-semibold text-slate-600 dark:text-slate-300">
                        {item.taxAssessed}
                      </td>

                      {/* Enrichment Badge */}
                      <td className="py-4 px-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-[11px] font-bold">
                          <Layers className="w-3 h-3" />
                          {item.enrichment}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-3 text-right">
                        <Link
                          href={`/properties/${item.id}`}
                          className="inline-block px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      No properties found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Side-by-Side Map View (Matching Exact UI Screenshot 2) */
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2">
              <button
                onClick={() => setIsMapView(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ← Back to Table View
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (4 cols): MAP View Property Cards List */}
              <div className="lg:col-span-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  MAP View
                </h3>

                <div className="space-y-3">
                  {propertiesData.map((item) => {
                    const isSelected = item.id === selectedPropertyId;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPropertyId(item.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? "bg-slate-100/90 dark:bg-slate-800/90 border-slate-400 dark:border-slate-600 ring-2 ring-slate-400/30"
                            : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <MapPin
                          className={`w-5 h-5 mt-0.5 shrink-0 ${
                            isSelected
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-400"
                          }`}
                        />

                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                            {item.address}
                          </h4>
                          <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            {item.cityStateZip}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column (8 cols): Interactive Map Area */}
              <div className="lg:col-span-8 relative h-[600px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-200">
                {/* Live OpenStreetMap Iframe */}
                <iframe
                  title="OpenStreetMap Property View"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 pointer-events-auto"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-87.9200%2C43.0400%2C-87.8600%2C43.0800&amp;layer=mapnik"
                />

                {/* Property Pins on Map */}
                {/* Pin 1 (Active Selected) */}
                <div className="absolute top-[38%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group">
                  {/* Floating Callout Popup */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 mb-2 text-center min-w-[180px] animate-bounce">
                    <h5 className="text-xs font-black text-slate-900 dark:text-white">
                      {activeProperty.address}
                    </h5>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      {activeProperty.cityStateZip}
                    </p>
                  </div>

                  {/* Black Location Pin */}
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-2xl ring-4 ring-white">
                    <MapPin className="w-5 h-5 fill-black text-white" />
                  </div>
                </div>

                {/* Additional Red Pins */}
                <div className="absolute top-[48%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl ring-2 ring-white cursor-pointer hover:scale-125 transition-transform">
                    <MapPin className="w-4 h-4 fill-rose-600 text-white" />
                  </div>
                </div>

                <div className="absolute top-[62%] left-[78%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl ring-2 ring-white cursor-pointer hover:scale-125 transition-transform">
                    <MapPin className="w-4 h-4 fill-rose-600 text-white" />
                  </div>
                </div>

                <div className="absolute top-[30%] left-[28%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl ring-2 ring-white cursor-pointer hover:scale-125 transition-transform">
                    <MapPin className="w-4 h-4 fill-rose-600 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
