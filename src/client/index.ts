import { readFileSync } from "node:fs";

import { type Plugin, type ResolvedConfig } from "vite";

import { createApp, indexTs, readIndexHtml } from "../files.js";

export const clientPlugin = (config: ResolvedConfig): Plugin => {
  const moduleId = "v-mark-docs:app";

  const resolvedModuleId = "\0" + moduleId;

  const html = readIndexHtml("./index.html").replace("__ENTRY__", indexTs(config.root));

  return {
    name: "custom-index-file",

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/") {
          const transformedHtml = await server.transformIndexHtml(req.url, html);

          res.statusCode = 200;
          res.setHeader("content-type", "text/html; charset=UTF-8");
          res.end(transformedHtml);
        } else {
          next();
        }
      });
    },

    resolveId(id) {
      if (id === moduleId) {
        return resolvedModuleId;
      }
    },

    load(id) {
      if (id === resolvedModuleId) {
        return readFileSync(createApp, "utf-8");
      }
    },
  };
};
