import { routes } from "v-mark-docs:routes";
import { createMemoryHistory, createRouter } from "vue-router";

export const router = createRouter({
  history: createMemoryHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      redirect: "button",
    },

    ...routes.map((route) => ({
      path: route.frontMatter!.slug,
      name: route.frontMatter!.title.toLowerCase().replaceAll(" ", "-"),
      component: () => import(/* @vite-ignore */ route.path),
    })),
  ],
});
