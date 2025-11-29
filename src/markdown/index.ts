import { componentPlugin } from "@mdit-vue/plugin-component";
import { sfcPlugin, type MarkdownSfcBlocks } from "@mdit-vue/plugin-sfc";
import { frontmatterPlugin } from "@mdit-vue/plugin-frontmatter";

// @ts-expect-error due to missing types
import markPlugin from "markdown-it-mark";
import attrsPlugin from "markdown-it-attrs";
import anchorPlugin from "markdown-it-anchor";
import metaPlugin from "markdown-it-vue-meta";
import markdown from "markdown-it";

import type { PluginOptions, MarkdownItEnv } from "markdown-it-vue-meta";

import type { PluginSimple } from "markdown-it";
import type { PluginOption } from "vite";

import type MarkdownIt from "markdown-it";

export interface MarkdownPluginOptions {
  /**
   * Additional markdown-it setup.
   */
  setup?: PluginSimple;

  /**
   * The highlight option for `markdown-it`.
   */
  highlight?: (md: MarkdownIt, code: string, lang: string, attrs: string) => string;

  meta?: PluginOptions;
}

interface FullMarkdownItEnv extends MarkdownItEnv {
  sfcBlocks?: MarkdownSfcBlocks;
  content?: string;
  excerpt?: string;
  frontmatter?: Record<string, unknown>;
}

/**
 * Processes blocks with the lang set to `md` into HTML,
 * and turns `.md` files into single file vue components
 * - using `markdown-it`.
 *
 * This requires adding `/\.md$/` as
 * part of the `include` option for Vue
 * to allow SFC imports of `.md` files.
 *
 * ```ts
 * export default defineConfig({
 *   plugins: [vue({ include: [/\.vue$/, /\.md$/] })],
 * })
 * ```
 */
export const markdownPlugin = (options?: MarkdownPluginOptions): PluginOption => {
  const md = markdown({
    html: true,

    highlight(code, lang, attrs): string {
      return options?.highlight?.(md, code, lang, attrs) ?? "";
    },
  });

  md.use(frontmatterPlugin);
  md.use(sfcPlugin);
  md.use(componentPlugin);
  md.use(metaPlugin, options?.meta);

  md.use(anchorPlugin, { permalink: anchorPlugin.permalink.headerLink() });
  md.use(markPlugin);
  md.use(attrsPlugin);

  if (options?.setup) {
    md.use(options.setup);
  }

  return {
    name: "markdown",
    enforce: "pre",

    transform(code, id) {
      if (id.endsWith(".md")) {
        const env: FullMarkdownItEnv = {
          path: id.replace(/[?#].*$/, ""),
        };

        const html = md.render(code, env);

        const replaceFrontMatterVariables = (text: string) => {
          if (!env.frontmatter) {
            return text;
          }

          let copy = text.replaceAll(/{{ ?\$frontmatter\.([A-z]*) ?}}/g, "$frontmatter.$1");

          for (const property in env.frontmatter) {
            const value = env.frontmatter[property] as string | number | undefined;

            const formattedValue = typeof value === "number" ? value.toString() : (value ?? "");
            copy = copy.replaceAll(`$frontmatter.${property}`, formattedValue);
          }

          return copy;
        };

        /**
         * If it's a markdown block, return the
         * html directly - otherwise create
         * a single file component.
         */
        if (id.endsWith("lang.md")) {
          return replaceFrontMatterVariables(html);
        } else {
          const template = env.sfcBlocks?.template?.content ?? "";

          let script = env.sfcBlocks?.scriptSetup?.contentStripped ?? "";

          if (env.frontmatter) {
            script += `\nconst $frontmatter = ${JSON.stringify(env.frontmatter)};`;
          }

          const styles = env.sfcBlocks?.styles.map((s) => s.content).join("\n\n") ?? "";

          return `${template}\n\n<script setup>${script}</script>\n\n${styles}`;
        }
      }
    },
  };
};
