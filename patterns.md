# patterns.md

## 🧠 Purpose

This file defines **standard implementation patterns** agents must follow when building features.

Agents should:

- Prefer these patterns over inventing new ones
- Reuse and adapt patterns instead of rewriting logic
- Keep implementations consistent across the codebase

---

## 🗺️ 1. Map Initialization Pattern

**Goal:** Initialize Leaflet map once and reuse it

### Pattern

```ts
let map: L.Map;

onMounted(() => {
  if (!mapEl.value) return;

  map = L.map(mapEl.value).setView([lat, lng], zoom);

  L.tileLayer(TILE_URL, {
    attribution: ATTRIBUTION,
  }).addTo(map);
});
```
