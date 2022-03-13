import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PactView from "../views/PactView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index.html",
    name: "pact",
    component: PactView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
