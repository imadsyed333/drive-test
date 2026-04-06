// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["leaflet/dist/leaflet.css"],
  app: {
    head: {
      title: "Drive Test Route Planner",
      meta: [
        {
          name: "description",
          content: "Create and export custom driving routes for practice tests",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  ssr: false,
});
