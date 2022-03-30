import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LottieAnimation from "lottie-web-vue";

createApp(App).use(LottieAnimation).use(store).use(router).mount("#app");
