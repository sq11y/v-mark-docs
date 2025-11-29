import {
  createApp as createVueApp,
  h,
  provide,
  defineComponent,
  computed,
  type Component,
  type App,
} from "vue";

import { useRoute } from "vue-router";

const Root = defineComponent({
  name: "__ROOT__",

  setup(_, { slots }) {
    const route = useRoute();

    const frontmatter = computed(() => route.meta ?? {});

    provide("frontmatter", frontmatter);

    return () => (slots.default ? slots.default() : null);
  },
});

export const createApp = <T = any>(Site: Component, callback: (app: App<T>) => void) => {
  const app = createVueApp(h(Root, undefined, () => h(Site)));

  callback(app);

  app.mount("#app");
};
