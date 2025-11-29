import { readFileSync } from "node:fs";

import type { PluginOption } from "vite";

import fg from "fast-glob";
import fm, { type FrontMatterResult } from "front-matter";

type Page = {
  path: string;
  frontmatter: FrontMatterResult<{ slug: string; title: string }>["attributes"];
};

const plugin = (pages: Page[]): PluginOption => {
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
        const imports = pages
          .map((file, i) => `import Component${i} from "${file.path}";`)
          .join("\n");

        const routes = pages.map((route) => ({
          path: route.frontmatter.slug,
          meta: route.frontmatter,
        }));

        const stringRoutes = routes.map((route, i) =>
          `{
            path: "${route.path}",
            meta: ${JSON.stringify(route.meta)},

            component: Component${i},
          }`.trim(),
        );

        const exports = `export const routes = [${stringRoutes.join(",\n")}]`;

        return `${imports}\n${exports}`;
      }
    },
  };
};

export const routerPlugin = (cwd: string): PluginOption => {
  const markdownFiles = fg.globSync(["(docs|src)/**/*.md"], { absolute: true, cwd });

  const pages = markdownFiles
    .map((path) => ({
      path,
      content: readFileSync(path, "utf-8"),
    }))
    .map((file) => ({
      path: file.path,
      frontmatter: (fm(file.content).attributes ?? {}) as Record<string, unknown>,
    }))
    .filter((file): file is Page => {
      const { title, slug } = file.frontmatter;
      return typeof title === "string" && typeof slug === "string";
    });

  return plugin(pages);
};
