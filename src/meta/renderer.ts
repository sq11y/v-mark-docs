import { existsSync } from "node:fs";
import { join } from "node:path";

import MarkdownIt from "markdown-it";

import { getComponentMeta } from "./utils.js";

import type { MarkdownItEnv, Renderer } from "./types.js";
import type { RenderRule } from "markdown-it/lib/renderer.mjs";

export const renderer = (md: MarkdownIt, render: Renderer): RenderRule => {
  return (tokens, index, _, env: MarkdownItEnv) => {
    const token = tokens[index];

    const title = token?.meta.title.trim();

    if (!env.checker) {
      return render(undefined, title, env);
    }

    if (!token?.meta.path) {
      return render(undefined, title, env);
    }

    const path = join(env.path, "../", token.meta.path);

    if (!existsSync(path)) {
      return render(undefined, title, env);
    }

    const meta = getComponentMeta(path, env.checker, (description) => {
      return md.render(description, {
        ...env,
        footnotes: false,
      });
    });

    return render(meta, title, env);
  };
};
