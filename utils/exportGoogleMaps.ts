// utils/exportGoogleMaps.ts
// Generates a Google Maps directions URL from GeoJSON coordinates.
// Google Maps supports up to 10 waypoints (origin + destination + 8 stops).

import type { RouteFeature } from "~/composables/useRouteStore";

const MAX_WAYPOINTS = 10;

export function toGoogleMapsUrl(feature: RouteFeature): string {
  const coords = feature.geometry.coordinates; // [lng, lat][]

  if (coords.length < 2) {
    throw new Error(
      "At least 2 points are required to generate a Google Maps URL",
    );
  }

  // Downsample to fit within Google Maps waypoint limit
  const sampled = sampleCoords(coords, MAX_WAYPOINTS);

  const [originLng, originLat] = sampled[0];
  const [destLng, destLat] = sampled[sampled.length - 1];
  const waypoints = sampled.slice(1, -1);

  const origin = `${originLat},${originLng}`;
  const destination = `${destLat},${destLng}`;

  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });

  if (waypoints.length > 0) {
    const waypointStr = waypoints
      .map(([lng, lat]) => `${lat},${lng}`)
      .join("|");
    params.set("waypoints", waypointStr);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function sampleCoords(
  coords: [number, number][],
  maxPoints: number,
): [number, number][] {
  if (coords.length <= maxPoints) return coords;

  const result: [number, number][] = [coords[0]];
  const step = (coords.length - 1) / (maxPoints - 1);

  for (let i = 1; i < maxPoints - 1; i++) {
    result.push(coords[Math.round(i * step)]);
  }

  result.push(coords[coords.length - 1]);
  return result;
}
