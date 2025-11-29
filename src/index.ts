import { writeFile } from "node:fs/promises";

import { mergeConfig, resolveConfig, createServer, build, preview } from "vite";

import { getUserViteConfig, getViteConfig } from "./config.js";

import { plugins } from "./plugins.js";
import { distIndexHtml, dist404Html, readIndexHtml } from "./files.js";

const [_, __, command = "dev"] = process.argv;

if (command !== "dev" && command !== "build" && command !== "preview") {
  throw new Error();
}

const config = mergeConfig(await getUserViteConfig(command), getViteConfig());

const resolvedConfig = await resolveConfig(config, "serve");

const configWithPlugins = mergeConfig(config, { plugins: await plugins(resolvedConfig) });

if (command === "dev") {
  const server = await createServer(configWithPlugins);

  await server.listen();

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
} else {
  await build(configWithPlugins);

  const html = readIndexHtml("./index.build.html");

  await writeFile(distIndexHtml, html);
  await writeFile(dist404Html, html);

  if (command === "preview") {
    const previewServer = await preview(configWithPlugins);

    previewServer.printUrls();
    previewServer.bindCLIShortcuts({ print: true });
  }
}
