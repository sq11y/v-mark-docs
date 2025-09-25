import { renderer } from "./renderer.js";
import { rule } from "./rule.js";

import type { Renderer } from "./types.js";
import type MarkdownIt from "markdown-it";

/**
 * Adds `[?<title>]: <path>.vue` syntax which
 * will then get the metadata for that Vue component
 * allowing you to render it.
 *
 * Comments for props, events and slots will also be run through markdown
 * before the metadata is returned to you.
 *
 * @param md The markdown instance.
 */
export const metaPlugin = (render: Renderer) => {
  return (md: MarkdownIt) => {
    md.block.ruler.before("reference", "meta_block", rule, {
      alt: ["paragraph", "reference"],
    });

    md.renderer.rules.meta = renderer(md, render);
  };
};
