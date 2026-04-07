<script setup lang="ts">
// MapControls.vue
// UI control panel: clear, undo, and export actions.
// Does not contain map or route logic — delegates to composable and utils.

import { ref, computed } from "vue";
import { useRouteStore } from "~/composables/useRouteStore";
import { downloadGpx } from "~/utils/exportGpx";
import { downloadKml } from "~/utils/exportKml";
import { toGoogleMapsUrl } from "~/utils/exportGoogleMaps";

const {
  points,
  closed,
  geoJson,
  hasRoute,
  canClose,
  undoLastPoint,
  clearRoute,
  toggleClosed,
} = useRouteStore();
const exportMenuOpen = ref(false);

const pointCount = computed(() => points.value.length);

function onExportGpx() {
  downloadGpx(geoJson.value);
  exportMenuOpen.value = false;
}

function onExportKml() {
  downloadKml(geoJson.value);
  exportMenuOpen.value = false;
}

function onOpenGoogleMaps() {
  const url = toGoogleMapsUrl(geoJson.value);
  window.open(url, "_blank", "noopener,noreferrer");
  exportMenuOpen.value = false;
}

function toggleExportMenu() {
  exportMenuOpen.value = !exportMenuOpen.value;
}

function closeExportMenu() {
  exportMenuOpen.value = false;
}
</script>

<template>
  <div class="controls">
    <div class="controls__info">
      <span class="controls__count"
        >{{ pointCount }} point{{ pointCount !== 1 ? "s" : "" }}</span
      >
      <span v-if="!hasRoute" class="controls__hint"
        >Click the map to add route points</span
      >
    </div>

    <div class="controls__actions">
      <button
        class="btn btn--secondary"
        :disabled="pointCount === 0"
        @click="undoLastPoint"
      >
        Undo
      </button>

      <button
        class="btn btn--secondary"
        :class="{ 'btn--active': closed }"
        :disabled="!canClose"
        @click="toggleClosed"
      >
        {{ closed ? "Open Path" : "Close Path" }}
      </button>

      <button
        class="btn btn--danger"
        :disabled="pointCount === 0"
        @click="clearRoute"
      >
        Clear
      </button>

      <div class="export-menu" @mouseleave="closeExportMenu">
        <button
          class="btn btn--primary"
          :disabled="!hasRoute"
          @click="toggleExportMenu"
        >
          Export ▾
        </button>

        <div v-if="exportMenuOpen && hasRoute" class="export-menu__dropdown">
          <button class="export-menu__item" @click="onExportGpx">
            Download GPX
          </button>
          <button class="export-menu__item" @click="onExportKml">
            Download KML
          </button>
          <button class="export-menu__item" @click="onOpenGoogleMaps">
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.controls__info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
}

.controls__count {
  font-weight: 600;
}

.controls__hint {
  color: #9ca3af;
}

.controls__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn {
  padding: 0.4rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn--primary {
  background: #3b82f6;
  color: #fff;
}

.btn--primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn--active {
  background: #dbeafe;
  color: #1d4ed8;
}

.btn--active:hover:not(:disabled) {
  background: #bfdbfe;
}

.btn--danger {
  background: #fee2e2;
  color: #b91c1c;
}

.btn--danger:hover:not(:disabled) {
  background: #fecaca;
}

.export-menu {
  position: relative;
}

.export-menu__dropdown {
  position: absolute;
  top: calc(100%);
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;
}

.export-menu__item {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
}

.export-menu__item:hover {
  background: #f3f4f6;
}
</style>
