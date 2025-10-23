import { readFileSync } from "node:fs";

import type { PluginOption } from "vite";

import fg from "fast-glob";
import fm from "front-matter";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const plugin = (frontMatter: any[]): PluginOption => {
  const moduleId = "v-mark-docs:routes";

  const resolvedModuleId = "\0" + moduleId;

  return {
    name: "v-mark-docs:routes",

    resolveId(id) {
      if (id === moduleId) {
        return resolvedModuleId;
      }
    },

    load(id) {
      if (id === resolvedModuleId) {
        return `export const routes = ${JSON.stringify(frontMatter)}`;
      }
    },
  };
};

export default (cwd: string, include?: string): PluginOption => {
  if (!include) {
    return plugin([]);
  }

  const markdownFiles = fg.globSync(include, { absolute: true, cwd });

  const frontMatters = markdownFiles
    .map((path) => ({
      path,
      content: readFileSync(path, "utf-8"),
    }))
    .map((file) => ({
      path: file.path,
      frontMatter: fm(file.content).attributes,
    }));

  return plugin(frontMatters);
};
