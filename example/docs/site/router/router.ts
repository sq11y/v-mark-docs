import { routes } from "v-mark-docs:routes";
import { createWebHistory, createRouter } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      redirect: "button",
    },

    ...routes,
  ],
});
