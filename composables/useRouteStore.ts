// composables/useRouteStore.ts
// GeoJSON is the single source of truth for route state.
// Named useRouteStore to avoid collision with Nuxt's built-in useRoute.

import { ref, computed } from "vue";

export interface RouteCoordinate {
  lat: number;
  lng: number;
}

export interface RouteFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: [number, number][]; // [lng, lat] per GeoJSON spec
  };
  properties: Record<string, unknown>;
}

// Module-level singleton so all components share the same reactive state
const points = ref<RouteCoordinate[]>([]);
const closed = ref(false);

export const useRouteStore = () => {
  // GeoJSON representation — coordinates are [lng, lat] per spec
  // When closed, the first coordinate is repeated at the end
  const geoJson = computed<RouteFeature>(() => {
    const coords: [number, number][] = points.value.map((p) => [p.lng, p.lat]);
    if (closed.value && coords.length >= 3) {
      coords.push(coords[0]);
    }
    return {
      type: "Feature",
      geometry: { type: "LineString", coordinates: coords },
      properties: {},
    };
  });

  const hasRoute = computed(() => points.value.length >= 2);
  const canClose = computed(() => points.value.length >= 3);

  function toggleClosed() {
    if (canClose.value) closed.value = !closed.value;
  }

  function addPoint(coord: RouteCoordinate) {
    points.value = [...points.value, coord];
  }

  function updatePoint(index: number, coord: RouteCoordinate) {
    if (index < 0 || index >= points.value.length) return;
    const updated = [...points.value];
    updated[index] = coord;
    points.value = updated;
  }

  function removePoint(index: number) {
    if (index < 0 || index >= points.value.length) return;
    points.value = points.value.filter((_, i) => i !== index);
  }

  function undoLastPoint() {
    if (points.value.length === 0) return;
    points.value = points.value.slice(0, -1);
  }

  function clearRoute() {
    points.value = [];
    closed.value = false;
  }

  return {
    points,
    closed,
    geoJson,
    hasRoute,
    canClose,
    addPoint,
    updatePoint,
    removePoint,
    undoLastPoint,
    clearRoute,
    toggleClosed,
  };
};
