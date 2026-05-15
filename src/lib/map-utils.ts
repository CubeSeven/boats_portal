export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  sub?: string;
  href?: string;
}

export interface RouteEndpoints {
  origin: MapPoint;
  destination: MapPoint;
  waypoints?: MapPoint[];
}

export function initMap(
  el: HTMLElement,
  center: [number, number],
  zoom: number
) {
  const L = (window as any).L;
  const map = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView(center, zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
  }).addTo(map);

  return map;
}

export function addMarker(
  map: any,
  point: MapPoint,
  index?: number
) {
  const L = (window as any).L;

  const icon = index !== undefined
    ? L.divIcon({
        html: `<div style="width:28px;height:28px;background:var(--foreground,oklch(0.15 0.02 240));color:var(--background,white);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.8rem;box-shadow:0 4px 12px rgba(0,0,0,0.35);border:2px solid white;">${index}</div>`,
        className: 'custom-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      })
    : L.divIcon({
        html: `<div style="width:20px;height:20px;background:oklch(0.55 0.18 220);border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 12px rgba(0,0,0,0.35);border:2px solid white;"></div>`,
        className: 'custom-marker',
        iconSize: [20, 28],
        iconAnchor: [10, 14],
        popupAnchor: [0, -16],
      });

  const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);

  let popupContent = `<strong>${point.label}</strong>`;
  if (point.sub) popupContent += `<br><span style="font-size:0.8rem;color:var(--muted-foreground,#666)">${point.sub}</span>`;
  if (point.href)
    popupContent += `<br><a href="${point.href}" style="font-size:0.8rem;font-weight:600;">View Details →</a>`;
  marker.bindPopup(popupContent);

  return marker;
}

export function addRoute(
  map: any,
  endpoints: RouteEndpoints
) {
  const L = (window as any).L;

  const allPoints: MapPoint[] = [
    endpoints.origin,
    ...(endpoints.waypoints || []),
    endpoints.destination,
  ];

  const latlngs = allPoints.map((p) => [p.lat, p.lng] as [number, number]);

  const polyline = L.polyline(latlngs, {
    color: 'oklch(0.55 0.18 220)',
    weight: 3,
    opacity: 0.8,
    dashArray: '10 6',
  }).addTo(map);

  addMarker(map, endpoints.origin, 1);

  endpoints.waypoints?.forEach((wp, i) => {
    addMarker(map, wp, i + 2);
  });

  const destIcon = L.divIcon({
    html: `<div style="width:24px;height:24px;background:oklch(0.45 0.15 25);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.35);border:2px solid white;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>`,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const destMarker = L.marker([endpoints.destination.lat, endpoints.destination.lng], { icon: destIcon }).addTo(map);
  let destPopup = `<strong>${endpoints.destination.label}</strong>`;
  if (endpoints.destination.href)
    destPopup += `<br><a href="${endpoints.destination.href}" style="font-size:0.8rem;font-weight:600;">View Details →</a>`;
  destMarker.bindPopup(destPopup);

  return polyline;
}

export function fitAllMarkers(map: any, points: MapPoint[]) {
  const L = (window as any).L;
  const bounds = L.latLngBounds(
    points.map((p) => [p.lat, p.lng])
  );
  map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
}
