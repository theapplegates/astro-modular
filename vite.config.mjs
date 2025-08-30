import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "copy-content-images",
      generateBundle() {
        // This will be handled by Astro build process
      }
    }
  ]
});
