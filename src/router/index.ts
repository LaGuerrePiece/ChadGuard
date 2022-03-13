import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StartView from "../views/StartView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index.html",
    name: "home",
    component: HomeView,
  },
  {
    path: "/start",
    name: "start",
    component: StartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
