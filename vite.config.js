import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [
    handlebars({
      partialDirectory: "./src/templates/partials",
    }),
  ],
  root: "./src",
});
