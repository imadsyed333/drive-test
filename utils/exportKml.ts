// utils/exportKml.ts
// Pure function: converts a GeoJSON LineString feature to a KML string.

import type { RouteFeature } from "~/composables/useRouteStore";

export function toKml(feature: RouteFeature): string {
  const coords = feature.geometry.coordinates;

  const coordString = coords
    .map(([lng, lat]) => `${lng},${lat},0`)
    .join("\n          ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Driving Test Route</name>
    <Placemark>
      <name>Route</name>
      <LineString>
        <tessellate>1</tessellate>
        <coordinates>
          ${coordString}
        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;
}

export function downloadKml(
  feature: RouteFeature,
  filename = "route.kml",
): void {
  const content = toKml(feature);
  triggerDownload(content, filename, "application/vnd.google-earth.kml+xml");
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
