import { type Plugin, type ResolvedConfig } from "vite";

import { createApp, indexTs, readIndexHtml } from "../files.js";

export default (config: ResolvedConfig): Plugin => {
  const moduleId = "v-mark-docs:config";

  const html = readIndexHtml("./index.html").replace("__ENTRY__", createApp);

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

    async resolveId(id, importer) {
      if (id === moduleId) {
        return this.resolve(indexTs(config.root).replace(".ts", ""), importer);
      }
    },
  };
};
