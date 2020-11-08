import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import People from "../views/People.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "People",
    component: People,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
