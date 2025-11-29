import { readFileSync } from "node:fs";
import { join } from "node:path";

import { searchForWorkspaceRoot } from "vite";

const dirname = import.meta.dirname;

export const root = searchForWorkspaceRoot(process.cwd());

export const docs = join(root, "docs");

export const tsconfig = join(root, "tsconfig.app.json");

export const dist = join(docs, "dist");

export const distIndexHtml = join(dist, "index.html");

export const dist404Html = join(dist, "404.html");

export const indexTs = (cwd: string) => join(cwd, "site", "index.ts");

export const client = join(dirname, "client");

export const createApp = join(client, "entry.js");

export const readIndexHtml = (file: string) => {
  return readFileSync(join(client, file), "utf-8").replace("__TITLE__", "Documentation");
};
