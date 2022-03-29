import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue3Lottie from 'vue3-lottie'

createApp(App).use(store).use(router).use(Vue3Lottie).mount("#app");
