<template>
  <div
    class="relative flex flex-col w-full h-full border rounded default-bg default-text default-border"
  >
    <TheFAQ v-if="showFaq" :closeCallback="toggleFaq" />
    <router-view @toggleFaq="toggleFaq" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheFAQ from "@/components/TheFAQ.vue";
import "@/assets/tailwind.css";

export default defineComponent({
  components: {
    TheFAQ,
  },
  setup() {
    const showFaq = ref(false);
    let startDate: string;

    const toggleFaq = () => {
      showFaq.value = !showFaq.value;
    };

    return {
      showFaq,
      toggleFaq,
    };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Yanone+Kaffeesatz:wght@300&display=swap");

html,
body,
#app {
  // font-family: sans-serif;
  font-family: "Bebas Neue", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #111;
  overflow: hidden;
  width: 400px;
  height: 600px;
  margin: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  color: #a1b5f6;
  text-shadow: rgb(31, 35, 45) 5px 0px 0px,
    rgb(31, 35, 45) 4.90033px 0.993347px 0px,
    rgb(31, 35, 45) 4.60531px 1.94709px 0px,
    rgb(31, 35, 45) 4.12668px 2.82321px 0px,
    rgb(31, 35, 45) 3.48353px 3.58678px 0px,
    rgb(31, 35, 45) 2.70151px 4.20736px 0px,
    rgb(31, 35, 45) 1.81179px 4.6602px 0px,
    rgb(31, 35, 45) 0.849836px 4.92725px 0px,
    rgb(31, 35, 45) -0.145998px 4.99787px 0px,
    rgb(31, 35, 45) -1.13601px 4.86924px 0px,
    rgb(31, 35, 45) -2.08073px 4.54649px 0px,
    rgb(31, 35, 45) -2.94251px 4.04248px 0px,
    rgb(31, 35, 45) -3.68697px 3.37732px 0px,
    rgb(31, 35, 45) -4.28444px 2.57751px 0px,
    rgb(31, 35, 45) -4.71111px 1.67494px 0px,
    rgb(31, 35, 45) -4.94996px 0.7056px 0px,
    rgb(31, 35, 45) -4.99147px -0.291871px 0px,
    rgb(31, 35, 45) -4.83399px -1.27771px 0px,
    rgb(31, 35, 45) -4.48379px -2.2126px 0px,
    rgb(31, 35, 45) -3.95484px -3.05929px 0px,
    rgb(31, 35, 45) -3.26822px -3.78401px 0px,
    rgb(31, 35, 45) -2.4513px -4.35788px 0px,
    rgb(31, 35, 45) -1.53666px -4.75801px 0px,
    rgb(31, 35, 45) -0.560763px -4.96845px 0px,
    rgb(31, 35, 45) 0.437495px -4.98082px 0px,
    rgb(31, 35, 45) 1.41831px -4.79462px 0px,
    rgb(31, 35, 45) 2.34258px -4.41727px 0px,
    rgb(31, 35, 45) 3.17346px -3.86382px 0px,
    rgb(31, 35, 45) 3.87783px -3.15633px 0px,
    rgb(31, 35, 45) 4.4276px -2.32301px 0px,
    rgb(31, 35, 45) 4.80085px -1.39708px 0px, #1f232d 4.98271px -0.415447px 0px;
}
.default-active-border {
  @apply bg-opacity-60 border-b-4 border-[#a1b5f6];
}
.default-text {
  @apply text-[#1f232d];
}
.default-bg {
  @apply bg-[#f5c7ee];
}
.default-border {
  @apply border-[#1f232d];
}
.default-button {
  @apply border-2 bg-[#f0a6e4] border-[#1f232d] rounded px-5 py-1 text-lg;
}
.input,
select {
  @apply border-2 bg-[#f0a6e4] border-[#1f232d];
}
.default-hover {
  @apply hover:bg-[#f0a6e4] hover:bg-opacity-50;
}
.input {
  font-size: 14px;
}
input::placeholder {
  color: rgba(31, 35, 45, 0.7);
}
select {
  @apply text-lg;
}
</style>
