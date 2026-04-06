# tasks.md

## 🎯 Project Goal

Build a web app that allows users to create custom driving routes and export them for navigation to practice driving tests.

---

## 🧩 Phase 1: MVP (Core Functionality)

### 1. Map Setup

- [ ] Initialize Leaflet map in Nuxt
- [ ] Display OpenStreetMap tiles
- [ ] Center map on user or default location

---

### 2. Route Drawing

- [ ] Allow user to click to add points
- [ ] Store points as GeoJSON LineString
- [ ] Display route as polyline
- [ ] Allow dragging points to adjust route
- [ ] Allow deleting points

---

### 3. Route State Management

- [ ] Implement `useRoute` composable
- [ ] Ensure GeoJSON is single source of truth
- [ ] Keep state reactive and synced with map

---

### 4. Basic UI Controls

- [ ] Add "Clear Route" button
- [ ] Add "Undo Last Point" button
- [ ] Add "Export" button
- [ ] Add minimal control panel UI

---

### 5. Export Functionality

- [ ] Convert GeoJSON → GPX
- [ ] Convert GeoJSON → KML
- [ ] Trigger file download
- [ ] Validate exported file structure

---

## 🧪 Phase 2: UX Improvements

### 6. Route Editing Enhancements

- [ ] Visual markers for points
- [ ] Highlight selected point
- [ ] Smooth dragging experience

---

### 7. Persistence

- [ ] Save route to localStorage
- [ ] Load route on page refresh
- [ ] Optional: save multiple routes

---

### 8. Google Maps Export

- [ ] Generate Google Maps directions URL
- [ ] Handle waypoint limits gracefully

---

## 🚀 Phase 3: Advanced Features

### 9. Road Snapping

- [ ] Integrate OSRM or external routing API
- [ ] Snap drawn points to nearest roads
- [ ] Maintain performance

---

### 10. Route Simulation Features

- [ ] Add checkpoints
- [ ] Add timing or instructions
- [ ] Simulate driving test scenarios

---

### 11. Sharing

- [ ] Generate shareable route links
- [ ] Encode route as URL or ID
- [ ] Load route from URL

---

## 🤖 Phase 4: AI Integration (Optional)

- [ ] Analyze routes for difficulty
- [ ] Suggest improvements
- [ ] Generate practice routes automatically

---

## 🧱 Non-Functional Requirements

- Fast and responsive map interactions
- Clean and minimal UI
- Works on mobile devices
- No paid APIs required

---

## 🧭 Success Criteria

The app is successful when:

- A user can create a route in under 30 seconds
- The route can be exported and used in a navigation app
- The UI feels intuitive without instructions
