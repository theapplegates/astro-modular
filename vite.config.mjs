import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "copy-content-images",
      generateBundle() {
        // This will be handled by Astro build process
      }
    }
  ],
  server: {
    hmr: false
  },
  preview: {
    allowedHosts: [
      '7c7d17a5-9e7a-489b-81ee-2831ec9efa37-00-1hzc8ugx94cy6.janeway.replit.dev'
    ]
  }
});
