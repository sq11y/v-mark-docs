import { createApp } from "v-mark-docs:app";

import { router } from "./router/router";

import Site from "./Site.vue";

createApp(Site, (app) => {
  app.use(router);
});
