// utils/exportGpx.ts
// Pure function: converts a GeoJSON LineString feature to a GPX string.

import type { RouteFeature } from "~/composables/useRouteStore";

export function toGpx(feature: RouteFeature): string {
  const coords = feature.geometry.coordinates;

  const trkpts = coords
    .map(([lng, lat]) => `    <trkpt lat="${lat}" lon="${lng}"></trkpt>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Drive Test Route Planner"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1
    http://www.topografix.com/GPX/1/1/gpx.xsd">
  <trk>
    <name>Driving Test Route</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`;
}

export function downloadGpx(
  feature: RouteFeature,
  filename = "route.gpx",
): void {
  const content = toGpx(feature);
  triggerDownload(content, filename, "application/gpx+xml");
}

function triggerDownload(
  content: string,
  filename: string,
  mimeType: string,
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
