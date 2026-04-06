# AGENTS.md

## 🧠 Project Overview

This project is a web application for creating and exporting custom driving routes to help users practice for driving tests.

Users should be able to:

- Draw custom routes on a map
- Edit and refine routes
- Export routes into navigation-friendly formats (GPX, KML, Google Maps links)

The app prioritizes:

- Simplicity
- Performance
- Clean UX
- Open-source technologies

---

## 🏗️ Tech Stack

- Framework: Nuxt 3 (Vue 3 + Composition API)
- Mapping: Leaflet (initially), with optional future migration to MapLibre GL
- Data format: GeoJSON (internal), GPX/KML (export)
- Backend: Nuxt server routes (no separate backend initially)
- Language: TypeScript

---

## 📁 Architecture Principles

1. **Modular components**
   - Map logic must be split into small, focused components
   - Avoid monolithic map components

2. **Composable-first state**
   - Use Nuxt composables (`useRoute`, `useMap`, etc.)
   - Avoid global state libraries unless necessary

3. **Separation of concerns**
   - Drawing logic ≠ rendering logic
   - UI controls ≠ business logic
   - Conversion logic lives in `/utils`, not components

4. **GeoJSON as single source of truth**
   - All route data must be stored as GeoJSON
   - Do not introduce alternative internal formats

5. **Thin backend**
   - Server routes should only handle:
     - Format conversion (GeoJSON → GPX/KML)
     - Optional persistence
   - No heavy processing in API routes

---

## 🗺️ Map Interaction Rules

- Users should be able to:
  - Click to add points
  - Drag to adjust points
  - Remove points
- Routes should be stored as LineString GeoJSON
- Map interactions must feel smooth and responsive

---

## 📤 Export Requirements

Support:

- GPX export (primary)
- KML export
- Google Maps URL (limited waypoint support)

Export logic should:

- Be reusable
- Be testable
- Not depend on UI components

---

## ⚙️ Code Guidelines

- Use Composition API (`setup`, `ref`, `computed`)
- Keep components under ~200 lines where possible
- Use TypeScript for all logic
- Prefer pure functions in `/utils`

---

## 🚫 Avoid

- Large monolithic components
- Mixing UI + logic in the same file
- Storing route data in multiple formats
- Over-engineering (no premature abstractions)

---

## 🔄 Future Considerations

Agents should keep the architecture flexible for:

- OSRM / GraphHopper integration (route snapping)
- AI-assisted route generation or analysis
- User accounts and saved routes
- Mobile app integration

---

## ✅ Definition of Done

A feature is complete when:

- It works reliably
- It is modular and reusable
- It follows project structure
- It does not introduce unnecessary complexity
