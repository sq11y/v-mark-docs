import type { PluginOption } from "vite";
import { findUpSync } from "find-up";
import customBlock from "v-custom-block";

import markdown, { MarkdownPluginOptions } from "./markdown.js";
import routes from "./routes.js";
import { dirname } from "path";

export type { MarkdownPluginOptions } from "./markdown.js";

export interface MarkdownDocumentationPluginOptions extends MarkdownPluginOptions {
  /**
   * The glob for files to include in
   * router export.
   *
   * The router import will return an empty array if this is not set.
   */
  include?: string;
}

const packageLocation = findUpSync("package.json");

if (!packageLocation) {
  throw new Error();
}

export default (options: MarkdownDocumentationPluginOptions): PluginOption[] => [
  routes(dirname(packageLocation), options.include),
  markdown(options),
  customBlock("docs"),
];
