import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import markdown from "v-mark-docs";

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),

    markdown({
      meta: {
        tsconfigPath: fileURLToPath(new URL("./tsconfig.app.json", import.meta.url)),

        renderer: (meta, title) => `
          <h2>${title ?? "Untitled"}</h2>
          <pre><code>${JSON.stringify(meta, null, 2)}</code></pre>
        `,
      },
    }),
  ],
});
