/// <reference types="../../env.d.ts" />

import config from "v-mark-docs:config";
import routes from "v-mark-docs:routes";

import { createApp, h, provide, defineComponent, computed } from "vue";

import { createRouter, createWebHistory, useRoute } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      redirect: "button",
    },

    ...(routes as any),
  ],
});

const Root = defineComponent({
  name: "__ROOT__",

  setup(_, { slots }) {
    const route = useRoute();

    const frontmatter = computed(() => route?.meta ?? {});

    provide("frontmatter", frontmatter);

    return () => (slots.default ? slots.default() : null);
  },
});

const app = createApp(h(Root, undefined, () => h(config.Site)));

app.use(router);

config.setup?.(app);

app.mount("#app");
