"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
import type { PropertyListItem } from "../../services/properties.service";

const DEFAULT_CENTER: [number, number] = [43.0389, -87.9065];
const DEFAULT_ZOOM = 11;

function pinIcon(color: "red" | "black") {
  const fill = color === "black" ? "#0f172a" : "#dc2626";
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
      <path fill="${fill}" stroke="#fff" stroke-width="1.5" d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z"/>
      <circle cx="14" cy="14" r="5" fill="#fff"/>
    </svg>`,
  );
  return L.icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -36],
  });
}

const redIcon = pinIcon("red");
const blackIcon = pinIcon("black");

type MappableProperty = PropertyListItem & {
  latitude: number;
  longitude: number;
};

const geocodeCache = new Map<string, { lat: number; lng: number } | null>();

function addressKey(p: PropertyListItem): string {
  return `${p.street}|${p.city}|${p.state}|${p.zip}`.toLowerCase();
}

async function geocodeProperty(
  p: PropertyListItem,
): Promise<{ lat: number; lng: number } | null> {
  const key = addressKey(p);
  if (geocodeCache.has(key)) return geocodeCache.get(key) ?? null;

  const q = encodeURIComponent(
    `${p.street}, ${p.city}, ${p.state} ${p.zip}, USA`,
  );
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!res.ok) {
      geocodeCache.set(key, null);
      return null;
    }
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (!data[0]) {
      geocodeCache.set(key, null);
      return null;
    }
    const coords = {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
    if (!Number.isFinite(coords.lat) || !Number.isFinite(coords.lng)) {
      geocodeCache.set(key, null);
      return null;
    }
    geocodeCache.set(key, coords);
    return coords;
  } catch {
    geocodeCache.set(key, null);
    return null;
  }
}

function MapCamera({
  markers,
  selectedId,
}: {
  markers: MappableProperty[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!markers.length) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }

    if (selectedId) {
      const selected = markers.find((p) => p.id === selectedId);
      if (selected) {
        map.flyTo([selected.latitude, selected.longitude], 15, {
          duration: 0.55,
        });
      }
      return;
    }

    if (markers.length === 1) {
      map.setView([markers[0].latitude, markers[0].longitude], 14);
      return;
    }

    const bounds = L.latLngBounds(
      markers.map((p) => [p.latitude, p.longitude] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [map, markers, selectedId]);

  return null;
}

function PropertyMarker({
  item,
  isSelected,
  onSelect,
}: {
  item: MappableProperty;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    if (isSelected) {
      marker.openPopup();
    } else {
      marker.closePopup();
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[item.latitude, item.longitude]}
      icon={isSelected ? blackIcon : redIcon}
      eventHandlers={{
        click: () => onSelect(),
      }}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      <Popup>
        <div className="text-center min-w-[140px]">
          <p className="text-xs font-bold text-slate-900 m-0">{item.street}</p>
          <p className="text-[10px] font-medium text-slate-500 m-0 mt-0.5">
            {item.city}, {item.state} {item.zip}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export type PropertiesMapProps = {
  properties: PropertyListItem[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
};

export default function PropertiesMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
}: PropertiesMapProps) {
  const [resolved, setResolved] = useState<
    Record<string, { lat: number; lng: number }>
  >({});
  const [isGeocoding, setIsGeocoding] = useState(false);

  const propertyGeoKey = properties
    .map((p) => `${p.id}:${p.latitude ?? ""}:${p.longitude ?? ""}:${p.street}`)
    .join("|");

  useEffect(() => {
    let cancelled = false;

    async function resolveCoords() {
      const missing = properties.filter(
        (p) => p.latitude == null || p.longitude == null,
      );
      if (!missing.length) {
        setIsGeocoding(false);
        return;
      }

      setIsGeocoding(true);

      for (const p of missing) {
        if (cancelled) return;
        const coords = await geocodeProperty(p);
        if (coords && !cancelled) {
          setResolved((prev) =>
            prev[p.id]?.lat === coords.lat && prev[p.id]?.lng === coords.lng
              ? prev
              : { ...prev, [p.id]: coords },
          );
        }
        // Nominatim usage policy: ~1 request/second
        await new Promise((r) => setTimeout(r, 1100));
      }

      if (!cancelled) setIsGeocoding(false);
    }

    void resolveCoords();
    return () => {
      cancelled = true;
    };
    // propertyGeoKey captures id + address + stored coords
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyGeoKey]);

  const markers = useMemo(() => {
    const list: MappableProperty[] = [];
    for (const p of properties) {
      const lat = p.latitude ?? resolved[p.id]?.lat ?? null;
      const lng = p.longitude ?? resolved[p.id]?.lng ?? null;
      if (
        lat != null &&
        lng != null &&
        Number.isFinite(lat) &&
        Number.isFinite(lng)
      ) {
        list.push({ ...p, latitude: lat, longitude: lng });
      }
    }
    return list;
  }, [properties, resolved]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCamera markers={markers} selectedId={selectedPropertyId} />
        {markers.map((item) => (
          <PropertyMarker
            key={item.id}
            item={item}
            isSelected={item.id === selectedPropertyId}
            onSelect={() => onSelectProperty(item.id)}
          />
        ))}
      </MapContainer>

      {isGeocoding && markers.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/80 dark:bg-slate-900/80 pointer-events-none">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 text-center">
            Locating properties on the map…
          </p>
        </div>
      )}

      {!isGeocoding && markers.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/80 dark:bg-slate-900/80 pointer-events-none">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 text-center">
            Could not place properties on the map. Add coordinates or check
            addresses.
          </p>
        </div>
      )}
    </div>
  );
}
