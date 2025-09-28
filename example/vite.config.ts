import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import markdown from "v-mark-docs";

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore due to the error only existing in this package due to nested folder structure  */
    markdown({
      meta: {
        tsconfig: fileURLToPath(new URL("./tsconfig.app.json", import.meta.url)),

        renderer: (meta, title) => `
          <h2>${title}</h2>
          <pre><code>${JSON.stringify(meta, null, 2)}</code></pre>
          <pre><code>${meta.documentation ?? ""}</code></pre>
        `,
      },
    }),
  ],
});
