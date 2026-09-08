import { useEffect, useRef, useState } from "react";

// ул. Максима Горького, 150 — координаты из карточки 2GIS
const CENTER: [number, number] = [42.856873, 74.602358];
const ZOOM = 17;

export function Map2GIS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cleaned = false;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cleaned || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: CENTER,
        zoom: ZOOM,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        "https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1",
        {
          subdomains: "0123",
          maxZoom: 18,
          detectRetina: true,
        }
      ).addTo(map);

      const pin = L.divIcon({
        className: "map-pin",
        html: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#dc143c" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker(CENTER, { icon: pin }).addTo(map);

      mapRef.current = map;
      setReady(true);

      // Invalidate size once the container has been laid out in the circular wrapper.
      requestAnimationFrame(() => map.invalidateSize());
    })();

    return () => {
      cleaned = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/60 backdrop-blur-sm">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Загрузка карты…
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        className="map-2gis-container size-full"
        aria-label="Карта 2GIS"
      />
    </div>
  );
}
