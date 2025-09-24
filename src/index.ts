import docs from "./docs.js";
import markdown, { MarkdownPluginOptions } from "./markdown.js";

import type { PluginOption } from "vite";

export type { ComponentMeta } from "./meta/types.js";

export type PluginOptions = MarkdownPluginOptions & {
  /**
   * If the docs for a component should
   * be made available on it as `__docs`.
   */
  exposeDocs?: boolean;
};

export default (options: PluginOptions): PluginOption[] => {
  return [markdown(options), docs(options.exposeDocs)];
};
