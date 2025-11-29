declare module "*.md" {
  import { Component } from "vue";

  const markdown: Component;

  export default markdown;
}

declare module "v-mark-docs" {
  import { Component } from "vue";

  type Setup = {
    /**
     * The main component for the site.
     */
    Site: Component;

    /**
     * Additional setup for the app.
     */
    setup?(app: App): void;
  };

  type Config = {
    /**
     * Additional markdown-it setup.
     */
    setup?: PluginSimple;

    /**
     * The highlight option for `markdown-it`.
     */
    highlight?: (md: MarkdownIt, code: string, lang: string, attrs: string) => string;

    /**
     * The renderer option for `markdown-it-vue-meta`.
     */
    metaRenderer?: PluginOptions["renderer"];
  };

  export { Setup, Config };
}

declare module "v-mark-docs:routes" {
  import { RouteRecordRaw } from "vue-router";

  const routes: (Omit<RouteRecordRaw, "meta"> & {
    meta: Record<string, unknown> & {
      title: string;
      slug: string;
    };
  })[];

  export default routes;
}

declare module "v-mark-docs:config" {
  import { Component } from "vue";

  type Config = {
    Site: Component;
    setup?(app: App): void;
  };

  const config: Config;

  export default config;
}
