<script setup lang="ts">
// RouteLayer.vue
// Renders the route polyline and draggable/removable markers on the Leaflet map.
// Structural changes (add/remove points) rebuild only affected markers.
// Position changes (drag) update only the polyline in-place — no marker churn.

import L from "leaflet";
import { inject, watch, ref, onUnmounted } from "vue";
import { useRouteStore } from "~/composables/useRouteStore";
import type { Ref } from "vue";

const map = inject<Ref<L.Map | null>>("leaflet-map");
const { points, closed, updatePoint, removePoint } = useRouteStore();

const polyline = ref<L.Polyline | null>(null);
const markers = ref<L.Marker[]>([]);

function makeNumberedIcon(index: number): L.DivIcon {
  const number = index + 1;
  const isFirst = index === 0;
  const bg = isFirst ? "#1e3a5f" : "#3388ff";
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${bg};
      color:#fff;
      width:28px;
      height:28px;
      border-radius:50%;
      border:2px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
      display:flex;
      align-items:center;
      justify-content:center;
      font:600 12px/1 system-ui,sans-serif;
    ">${number}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function buildMarker(lat: number, lng: number, index: number): L.Marker {
  const marker = L.marker([lat, lng], {
    draggable: true,
    icon: makeNumberedIcon(index),
  });

  marker.on("dragend", () => {
    const pos = marker.getLatLng();
    updatePoint(index, { lat: pos.lat, lng: pos.lng });
  });

  marker.on("contextmenu", () => {
    removePoint(index);
  });

  // Stop click on marker propagating to the map (would create a new point)
  marker.on("click", (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e);
  });

  const label =
    index === 0
      ? "Start — right-click to remove"
      : `Point ${index + 1} — right-click to remove`;
  marker.bindTooltip(label, { direction: "top", offset: [0, -18] });

  return marker;
}

function getLatLngs(): L.LatLngTuple[] {
  const latlngs: L.LatLngTuple[] = points.value.map((p) => [p.lat, p.lng]);
  if (closed.value && latlngs.length >= 3) {
    latlngs.push(latlngs[0]);
  }
  return latlngs;
}

// Update (or create) the polyline in-place — avoids removing/re-adding the element
function updatePolyline() {
  if (!map?.value) return;
  const latlngs = getLatLngs();
  if (latlngs.length < 2) {
    polyline.value?.remove();
    polyline.value = null;
    return;
  }
  if (polyline.value) {
    polyline.value.setLatLngs(latlngs);
  } else {
    polyline.value = L.polyline(latlngs, {
      color: "#3388ff",
      weight: 4,
      opacity: 0.85,
    }).addTo(map.value);
  }
}

function rebuildMarkers() {
  markers.value.forEach((m) => m.remove());
  markers.value = [];
  if (!map?.value) return;
  points.value.forEach((p, i) => {
    const marker = buildMarker(p.lat, p.lng, i);
    marker.addTo(map.value!);
    markers.value.push(marker);
  });
}

function clearLayers() {
  polyline.value?.remove();
  polyline.value = null;
  markers.value.forEach((m) => m.remove());
  markers.value = [];
}

// Structural watch: only fires when points are added or removed
watch(
  () => points.value.length,
  (newLen, oldLen) => {
    if (!map?.value) return;
    if (newLen === 0) {
      clearLayers();
      return;
    }
    if (newLen > (oldLen ?? 0)) {
      // Append only the new marker(s)
      for (let i = markers.value.length; i < newLen; i++) {
        const p = points.value[i];
        const marker = buildMarker(p.lat, p.lng, i);
        marker.addTo(map.value!);
        markers.value.push(marker);
      }
    } else {
      // A point was removed — indices may have shifted, rebuild all markers
      rebuildMarkers();
    }
    updatePolyline();
  },
);

// Position/closed watch: fires when coordinates change (drag) or closed state toggles
watch(
  () =>
    points.value.map((p) => `${p.lat},${p.lng}`).join("|") + "|" + closed.value,
  () => {
    updatePolyline();
  },
);

// Bootstrap once the map becomes available
watch(
  () => map?.value,
  (m) => {
    if (m && points.value.length > 0) {
      rebuildMarkers();
      updatePolyline();
    }
  },
);

onUnmounted(() => {
  clearLayers();
});
</script>

<template>
  <!-- Renderless component: all output goes to the Leaflet map -->
  <slot />
</template>
