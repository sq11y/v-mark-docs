import { createApp as createVueApp, type Component, type App } from "vue";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const createApp = <T = any>(site: Component, callback: (app: App<T>) => void) => {
  const app = createVueApp(site);

  callback(app);

  app.mount("#app");
};
