import { componentPlugin } from "@mdit-vue/plugin-component";
import { sfcPlugin } from "@mdit-vue/plugin-sfc";
import { createChecker } from "vue-component-meta";

// @ts-expect-error due to missing types
import markPlugin from "markdown-it-mark";
import attrsPlugin from "markdown-it-attrs";
import anchorPlugin from "markdown-it-anchor";
import markdown from "markdown-it";

import { metaPlugin } from "./meta/index.js";

import type { ComponentMeta, MarkdownItEnv } from "./meta/types.js";
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
   *
   * @param md The markdown instance
   * @param code The code snippet
   * @param lang The language for the code snippet
   * @param attrs The potential attributes provided by `markdown-it-attrs`
   */
  highlight?: (md: MarkdownIt, code: string, lang: string, attrs: string) => string;

  meta?: {
    /**
     * The path to the tsconfig that should be used for
     * the automatic vue component documentation.
     */
    tsconfigPath: string;

    /**
     * The function used to render the automatic
     * documentation of a vue component.
     *
     * @param meta The component meta data (a stripped down result from `vue-component-meta`)
     * @param title The title specified for the component
     */
    renderer: (meta?: ComponentMeta, title?: string) => string;
  };
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
 *
 * Comes with the ability to automatically
 * document SFC components with `vue-component-meta`.
 *
 * ```md
 * [? Component]: ../Component.vue
 * ```
 */
export default (options?: MarkdownPluginOptions): PluginOption => {
  const md = markdown({
    html: true,

    highlight(code, lang, attrs): string {
      return options?.highlight?.(md, code, lang, attrs) ?? "";
    },
  });

  const checker = (() => {
    if (!options?.meta) {
      return;
    }

    return createChecker(options.meta.tsconfigPath, {
      noDeclarations: true,
      rawType: false,
    });
  })();

  md.use(sfcPlugin);
  md.use(componentPlugin);

  /* prettier-ignore */
  md.use(metaPlugin((meta, title) => options?.meta?.renderer(meta, title) ?? ""));

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
        const env: MarkdownItEnv = {
          path: id.replace(/[?#].*$/, ""),
          checker,
        };

        const html = md.render(code, env);

        /**
         * If it's a markdown block, return the
         * html directly - otherwise create
         * a single file component.
         */
        if (id.endsWith("lang.md")) {
          return html;
        } else {
          const template = env.sfcBlocks?.template?.content ?? "";

          const script = env.sfcBlocks?.scriptSetup?.content ?? "";

          const styles = env.sfcBlocks?.styles.map((s) => s.content).join("\n\n") ?? "";

          return `${template}\n\n${script}\n\n${styles}`;
        }
      }
    },
  };
};
