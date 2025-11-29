declare module "*.md" {
  import { Component } from "vue";

  const markdown: Component;

  export default markdown;
}

declare module "v-mark-docs:routes" {
  import { RouteRecordRaw } from "vue-router";

  const routes: (Omit<RouteRecordRaw, "meta"> & {
    meta: Record<string, unknown> & {
      title: string;
      slug: title;
    };
  })[];

  export { routes };
}

declare module "v-mark-docs:app" {
  import { Component, App } from "vue";

  const createApp: (site: Component, callback: (app: App<Element>) => void) => void;

  export { createApp };
}
