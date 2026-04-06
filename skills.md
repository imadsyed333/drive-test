# skills.md

## 🧠 Core Mindset

Agents working on this project must prioritize:

- Simplicity over cleverness
- Readability over abstraction
- Incremental progress over large rewrites

Always:

- Build the smallest working version first
- Validate functionality before extending
- Avoid introducing unnecessary dependencies

---

## 🗺️ Mapping & Geospatial Skills

### 1. Coordinate Systems

- Leaflet uses: [lat, lng]
- GeoJSON uses: [lng, lat]

Agents MUST:

- Convert correctly between formats
- Never mix coordinate orders

---

### 2. GeoJSON Mastery

All route data is stored as:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [[lng, lat], ...]
  }
}
```
