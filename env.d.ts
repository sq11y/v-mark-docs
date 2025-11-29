declare module "*.md" {
  import { Component, VueElement } from "vue";
  const markdown: Component;
  export default markdown;
}

declare module "v-mark-docs:routes" {
  import { Component } from "vue";
  import { RouteRecordRaw } from "vue-router";

  const routes: RouteRecordRaw[];

  export { routes };
}

declare module "v-mark-docs:app" {
  import { Component, App } from "vue";

  const createApp: (site: Component, callback: (app: App<Element>) => void) => void;

  export { createApp };
}
