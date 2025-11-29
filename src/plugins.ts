import { join } from "node:path";

import type { ResolvedConfig } from "vite";

import customBlockPlugin from "v-custom-block";

import { routerPlugin } from "./routes/index.js";
import { clientPlugin } from "./client/index.js";
import { markdownPlugin } from "./markdown/index.js";

import { root } from "./files.js";

export const plugins = async (resolvedConfig: ResolvedConfig) => [
  await clientPlugin(resolvedConfig),
  routerPlugin(root),

  markdownPlugin({
    meta: {
      tsconfig: join(root, "tsconfig.app.json"),

      renderer: (meta, title) => `
          <h3>${title}</h3>
          <pre><code>${JSON.stringify(meta, null, 2)}</code></pre>
        `,
    },
  }),

  customBlockPlugin("docs"),
];
