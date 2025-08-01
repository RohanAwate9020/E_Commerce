import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ...
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
    fontFamily: {
    roboto: ['Roboto', 'sans-serif'],
  },
  },

  build: {
    outDir: "build",
  },
  base: "/", // or './' if you're hosting from a subfolder
});
