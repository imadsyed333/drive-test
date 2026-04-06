<script setup lang="ts">
// pages/index.vue
// Main page: composes MapView, RouteLayer, and MapControls.

useHead({
  title: "Drive Test Route Planner",
});
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Drive Test Route Planner</h1>
    </header>

    <MapControls />

    <main class="app__map">
      <ClientOnly>
        <MapView>
          <RouteLayer />
        </MapView>
        <template #fallback>
          <div class="app__loading">Loading map…</div>
        </template>
      </ClientOnly>
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#__nuxt {
  height: 100%;
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.app__header {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 52px;
  background: #1e3a5f;
  color: #fff;
  flex-shrink: 0;
}

.app__title {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.app__map {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.app__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-size: 0.875rem;
}
</style>
