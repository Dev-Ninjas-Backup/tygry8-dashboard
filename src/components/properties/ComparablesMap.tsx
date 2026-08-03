"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ComparableSale } from "./RecentComparablesCard";

const DEFAULT_CENTER: [number, number] = [43.0389, -87.9065];
const DEFAULT_ZOOM = 12;

function subjectIcon() {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="48" viewBox="0 0 34 48">
      <path fill="#0f2347" stroke="#fff" stroke-width="2" d="M17 0C7.611 0 0 7.611 0 17c0 12.667 17 31 17 31s17-18.333 17-31C34 7.611 26.389 0 17 0z"/>
      <circle cx="17" cy="17" r="7" fill="#fff"/>
      <circle cx="17" cy="17" r="3.5" fill="#0f2347"/>
    </svg>`,
  );
  return L.icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [34, 48],
    iconAnchor: [17, 48],
    popupAnchor: [0, -44],
  });
}

function compIcon(state: "default" | "hovered") {
  const fill = state === "hovered" ? "#2563eb" : "#dc2626";
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="36" viewBox="0 0 26 36">
      <path fill="${fill}" stroke="#fff" stroke-width="1.5" d="M13 0C5.82 0 0 5.82 0 13c0 9.5 13 23 13 23s13-13.5 13-23C26 5.82 20.18 0 13 0z"/>
      <circle cx="13" cy="13" r="4.5" fill="#fff"/>
    </svg>`,
  );
  return L.icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [26, 36],
    iconAnchor: [13, 36],
    popupAnchor: [0, -32],
  });
}

const subjectPin = subjectIcon();
const compDefault = compIcon("default");
const compHovered = compIcon("hovered");

type Pin = {
  id: string;
  address: string;
  soldDate: string;
  soldPrice: string;
  latitude: number;
  longitude: number;
};

function MapCamera({
  pins,
  hoveredId,
}: {
  pins: Pin[];
  hoveredId: string | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (hoveredId) {
      const pin = pins.find((p) => p.id === hoveredId);
      if (pin && Number.isFinite(pin.latitude) && Number.isFinite(pin.longitude)) {
        map.flyTo([pin.latitude, pin.longitude], 16, { duration: 0.45 });
      }
      return;
    }
    if (!pins.length) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }
    const bounds = L.latLngBounds(
      pins
        .filter(
          (p) =>
            Number.isFinite(p.latitude) &&
            Number.isFinite(p.longitude) &&
            p.latitude !== 0 &&
            p.longitude !== 0,
        )
        .map((p) => [p.latitude, p.longitude] as [number, number]),
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
    }
  }, [map, pins, hoveredId]);
  return null;
}

function CompMarker({
  pin,
  isHovered,
  onHover,
}: {
  pin: Pin;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<LeafletMarker | null>(null);
  useEffect(() => {
    if (ref.current) {
      if (isHovered) ref.current.openPopup();
      else ref.current.closePopup();
    }
  }, [isHovered]);
  return (
    <Marker
      ref={ref}
      position={[pin.latitude, pin.longitude]}
      icon={isHovered ? compHovered : compDefault}
      eventHandlers={{
        mouseover: () => onHover(pin.id),
        mouseout: () => onHover(null),
      }}
      zIndexOffset={isHovered ? 1000 : 0}
    >
      <Popup>
        <div className="text-center min-w-[150px] -my-1">
          <p className="text-[11px] font-bold text-slate-900 m-0 leading-tight">
            {pin.address.split(",")[0]}
          </p>
          <p className="text-[10px] font-medium text-slate-500 m-0 mt-1">
            {pin.soldDate}
          </p>
          <p className="text-xs font-extrabold text-slate-900 m-0 mt-1.5">
            {pin.soldPrice}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export interface ComparablesMapProps {
  subjectAddress?: string;
  subjectCoords: [number, number] | null;
  comparables: ComparableSale[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

export default function ComparablesMap({
  subjectAddress,
  subjectCoords,
  comparables,
  hoveredId,
  onHover,
}: ComparablesMapProps) {
  const pins: Pin[] = useMemo(
    () =>
      comparables
        .filter(
          (c) =>
            Number.isFinite(c.latitude) &&
            Number.isFinite(c.longitude) &&
            c.latitude !== 0 &&
            c.longitude !== 0,
        )
        .map((c) => ({
          id: c.id,
          address: c.address,
          soldDate: c.soldDate,
          soldPrice: c.soldPrice,
          latitude: c.latitude,
          longitude: c.longitude,
        })),
    [comparables],
  );

  const initialCenter: [number, number] = subjectCoords ?? pins[0]
    ? [pins[0].latitude, pins[0].longitude]
    : DEFAULT_CENTER;

  return (
    <MapContainer
      center={initialCenter}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full z-0"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCamera pins={pins} hoveredId={hoveredId} />
      {subjectCoords && (
        <Marker position={subjectCoords} icon={subjectPin} zIndexOffset={500}>
          <Popup>
            <div className="text-center min-w-[150px] -my-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 m-0">
                Subject
              </p>
              <p className="text-[11px] font-bold text-slate-900 m-0 mt-1 leading-tight">
                {subjectAddress}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
      {pins.map((pin) => (
        <CompMarker
          key={pin.id}
          pin={pin}
          isHovered={pin.id === hoveredId}
          onHover={onHover}
        />
      ))}
    </MapContainer>
  );
}