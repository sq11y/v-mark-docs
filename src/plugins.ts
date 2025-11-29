import type { ResolvedConfig } from "vite";

import type { Config } from "v-mark-docs";

import customBlockPlugin from "v-custom-block";
import clientPlugin from "./client/client.js";
import routesPlugin from "./routes/routes.js";
import markdownPlugin from "./markdown/markdown.js";

import { configTs, root } from "./files.js";

export const plugins = async (resolvedConfig: ResolvedConfig) => {
  const config: Config = (await import(configTs(resolvedConfig.root))).default;

  return [
    clientPlugin(resolvedConfig),
    routesPlugin(root),
    markdownPlugin(config),
    customBlockPlugin("docs"),
  ];
};
