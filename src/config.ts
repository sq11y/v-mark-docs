import { loadConfigFromFile, type UserConfig } from "vite";

import { client, dist, docs, indexTs, root } from "./files.js";

export const getUserViteConfig = async (command: "dev" | "build" | "preview") => {
  const userConfigFile = await loadConfigFromFile({
    command: command === "dev" ? "serve" : "build",
    mode: command === "dev" ? "dev" : "build",
  });

  return userConfigFile?.config ?? {};
};

export const getViteConfig = (): UserConfig => ({
  root: docs,

  server: {
    port: 1998,

    fs: {
      allow: [client, root],
    },
  },

  preview: {
    port: 1996,
  },

  build: {
    outDir: dist,

    rollupOptions: {
      input: indexTs(docs),

      output: {
        entryFileNames: () => "assets/[name].js",
        assetFileNames: () => "assets/[name][extname]",
      },
    },
  },
});
