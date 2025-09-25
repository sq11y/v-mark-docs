import { renderer } from "./renderer.js";
import { rule } from "./rule.js";

import type { Renderer } from "./types.js";
import type MarkdownIt from "markdown-it";

/**
 * Adds `[?<title>]: <path>.vue` syntax top\
 * get the metadata for the Vue component
 * and allows for rendering it.
 */
export const metaPlugin = (render: Renderer) => {
  return (md: MarkdownIt) => {
    md.block.ruler.before("reference", "meta_block", rule, {
      alt: ["paragraph", "reference"],
    });

    md.renderer.rules.meta = renderer(md, render);
  };
};
