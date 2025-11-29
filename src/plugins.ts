import type { ResolvedConfig } from "vite";

import customBlockPlugin from "v-custom-block";
import clientPlugin from "./client/client.js";
import routesPlugin from "./routes/routes.js";
import markdownPlugin from "./markdown/markdown.js";

import { indexTs, root } from "./files.js";

export const plugins = async (resolvedConfig: ResolvedConfig) => [
  clientPlugin(resolvedConfig),
  routesPlugin(root),
  markdownPlugin(
    (await import(indexTs(resolvedConfig.root).replace("index.ts", "config.ts"))).default,
  ),
  customBlockPlugin("docs"),
];
