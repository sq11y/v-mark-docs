import { existsSync } from "node:fs";
import { join } from "node:path";

import MarkdownIt from "markdown-it";

import { generateComponentMeta } from "./meta.js";

import type { MarkdownItEnv, Renderer } from "./types.js";
import type { RenderRule } from "markdown-it/lib/renderer.mjs";

export const renderer = (md: MarkdownIt, render: Renderer): RenderRule => {
  return (tokens, index, _, env: MarkdownItEnv) => {
    const token = tokens[index];

    const title = token?.meta.title;

    if (!env.checker || !token?.meta.path) {
      return render(undefined, title, env);
    }

    const path = join(env.path, "../", token.meta.path);

    if (!existsSync(path)) {
      return render(undefined, title, env);
    }

    const meta = generateComponentMeta(path, env.checker, (description) => {
      return md.render(description, { ...env });
    });

    return render(meta, title, env);
  };
};
