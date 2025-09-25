import markdown, { MarkdownPluginOptions } from "./markdown.js";

import type { PluginOption } from "vite";
import customBlock from "v-custom-block";

export type { MarkdownPluginOptions } from "./markdown.js";
export type { ComponentMeta } from "./meta/types.js";

export default (options: MarkdownPluginOptions): PluginOption[] => {
  return [markdown(options), customBlock("docs")];
};
