<script setup lang="ts">
// MapView.vue
// Initializes the Leaflet map and exposes it via provide() for child components.
// Handles click-to-add-point interactions.

import L from "leaflet";
import { onMounted, onUnmounted, ref, provide } from "vue";
import { useRouteStore } from "~/composables/useRouteStore";

const MAP_KEY = "leaflet-map";
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_CENTER: L.LatLngExpression = [51.505, -0.09];
const DEFAULT_ZOOM = 13;

const mapEl = ref<HTMLElement | null>(null);
const map = ref<L.Map | null>(null);
const { addPoint } = useRouteStore();

provide(MAP_KEY, map);

onMounted(() => {
  if (!mapEl.value) return;

  const leafletMap = L.map(mapEl.value).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

  L.tileLayer(TILE_URL, { attribution: ATTRIBUTION }).addTo(leafletMap);

  // Guard against Leaflet firing 'click' right after a map drag ends
  let isDragging = false;
  leafletMap.on("dragstart", () => {
    isDragging = true;
  });
  leafletMap.on("dragend", () => {
    setTimeout(() => {
      isDragging = false;
    }, 50);
  });

  leafletMap.on("click", (e: L.LeafletMouseEvent) => {
    if (isDragging) return;
    addPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
  });

  // Try to center on user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        leafletMap.setView(
          [pos.coords.latitude, pos.coords.longitude],
          DEFAULT_ZOOM,
        );
      },
      () => {
        // Silently fall back to default center
      },
    );
  }

  map.value = leafletMap;
});

onUnmounted(() => {
  map.value?.remove();
  map.value = null;
});

defineExpose({ MAP_KEY });
</script>

<template>
  <div ref="mapEl" class="map-container">
    <slot />
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
