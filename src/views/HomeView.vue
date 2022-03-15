<template>
  <div
    id="grandiv"
    class="h-[210px] relative w-full flex flex-col items-center shadow font-bold"
    style="
      background: url(https://media.discordapp.net/attachments/952181816364789772/952283565306032168/ChadPecs.png);
      background-size: 330px;
      background-repeat: no-repeat;
      background-position: 160px 0px;
      z-index: 30;
    "
  >
    <div
      class="flex flex-col flex-grow self-start justify-center"
      style="padding-left: 25px"
    >
      <div class="text-6xl logo">ChadGuard</div>
      <div class="text-2xl">{{ randomCatch }}</div>
    </div>
    <div
      class="h-12 w-full flex border-t-2 border-b-2 default-border bg-[#f0a6e4] bg-opacity-25"
      style="backdrop-filter: blur(2px)"
    >
      <div
        class="flex items-center justify-center flex-grow cursor-pointer text-xl"
        :class="{
          'default-active-border': !page,
          'default-hover cursor-pointer': page,
        }"
        @click="setPage(false)"
      >
        <BanIcon class="w-6 h-6 mr-1" /> BLOCK LIST
      </div>
      <div
        class="flex items-center justify-center flex-grow default-text text-xl"
        :class="{
          'default-active-border': page,
          'default-hover cursor-pointer ': !page,
        }"
        @click="setPage(true)"
      >
        <CogIcon class="w-6 h-6 mr-1" /> SETTINGS
      </div>
    </div>
  </div>
  <div
    class="rotate"
    style="
      position: fixed;
      height: 1600px;
      width: 1600px;
      top: -590px;
      left: -250px;
      z-index: 1;
    "
  >
    <img
      src="https://i.imgur.com/C2GBPBQ.png"
      style="height: 100%; opacity: 0.3"
    />
  </div>
  <div v-if="loading" class="flex justify-center items-center flex-grow">
    <LoadingSpinner />
  </div>
  <div
    class="overflow-y-auto p-3 flex-grow bg-[#f5c7ee] z-10"
    v-else-if="!page"
  >
    <div class="flex flex-col gap-2">
      <div v-if="addingLink" class="flex">
        <div class="input border-2 rounded flex-grow font-sans">
          <input
            type="text"
            class="w-full h-full bg-transparent px-3 py-1 outline-none text-center"
            v-model="addingLinkValue"
            v-on:keyup.enter="addLink(addingLinkValue)"
            ref="addInput"
          />
        </div>
        <XIcon
          class="w-5 h-5 flex ml-1.5 mt-1 cursor-pointer"
          @click="setAddingLink(false)"
        />
      </div>
      <div
        v-else
        class="flex justify-center items-center cursor-pointer py-1 default-hover"
        @click="setAddingLink(true)"
      >
        <PlusIcon class="w-5 h-5" />
      </div>
      <div v-for="link in links" :key="link" class="flex">
        <div class="input border-2 rounded flex-grow font-sans">
          <input
            type="text"
            :value="link"
            class="w-full h-full bg-transparent blur-sm hover:blur-none transition-all duration-500 px-3 py-1 outline-none text-center"
          />
        </div>
        <TrashIcon
          class="w-5 h-5 flex ml-1.5 mt-1 cursor-pointer"
          @click="removeLink(link)"
        />
      </div>
    </div>
  </div>
  <div
    class="oveflow-scoll p-5 flex flex-col grow items-start gap-5 bg-[#f5c7ee] z-10"
    v-else
  >
    <div class="flex flex-col gap-1 w-full items-start">
      <h1 class="text-lg font-bold">Blocking type :</h1>
      <select class="default-border px-3 py-1 rounded w-full">
        <option>Chad</option>
        <option>Video</option>
        <option>Auto-Close</option>
        <option>Chad (pink mode)</option>
      </select>
    </div>
    <div class="flex flex-col gap-1 w-full items-start">
      <h1 class="text-lg font-bold">AI Filtering :</h1>
      <select class="default-border px-3 py-1 rounded w-full">
        <option>Enabled</option>
        <option>Disabled</option>
      </select>
    </div>
    <div class="flex flex-col gap-1 w-full items-start">
      <h1 class="text-lg font-bold">Day Counter :</h1>
      <select class="default-border px-3 py-1 rounded w-full">
        <option>Enabled</option>
        <option>Disabled</option>
      </select>
    </div>
    <div class="flex flex-col gap-1 w-full items-start">
      <h1 class="text-lg font-bold">Discord :</h1>
      <button class="default-button">Connect with Discord</button>
    </div>
  </div>
  <TheFooter @toggleFaq="toggleFaq" />
</template>

<script lang="ts">
// Avoid this, temporary fix for Vue not finding chrome types when compiling
/* eslint-disable */

import { defineComponent, ref, watch } from "vue";
import TheFooter from "@/components/TheFooter.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { PlusIcon } from "@heroicons/vue/outline";
import { TrashIcon } from "@heroicons/vue/outline";
import { CogIcon } from "@heroicons/vue/outline";
import { BanIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    LoadingSpinner,
    TheFooter,
    PlusIcon,
    TrashIcon,
    CogIcon,
    BanIcon,
    XIcon,
  },
  setup(props, { emit }) {
    const page = ref(false);
    const addInput = ref();
    const addingLink = ref(false);
    const addingLinkValue = ref("");
    const links = ref<string[]>([]);
    const loading = ref(true);

    const setPage = (b: boolean) => {
      page.value = b;
    };

    const toggleFaq = () => {
      emit("toggleFaq");
    };

    const addLink = (url: string) => {
      console.log("aaaa");
      links.value.unshift(url);
      console.log(links.value);
      // chrome.storage.local.set({ blocklist: links.value });
      addingLinkValue.value = "";
      setAddingLink(false);
    };

    const removeLink = (url: string) => {
      var index = links.value.indexOf(url);
      if (index !== -1) {
        links.value.splice(index, 1);
        // chrome.storage.local.set({ blocklist: links.value });
      }
    };

    const setAddingLink = (bool: boolean) => {
      addingLink.value = bool;
      if (!bool) addingLinkValue.value = "";
    };

    watch(addInput, () => {
      if (addInput.value) (addInput.value as HTMLInputElement).select();
    });

    // chrome.storage.local.get(["blocklist"], (result) => {
    //   for (const key in result.blocklist) {
    //     links.value.push(result.blocklist[key]);
    //   }
    //   loading.value = false;
    // });

    loading.value = false;
    const phrases = [
      "I love you, brother",
      "What a bright day brother",
      "I'm proud of us",
      "To the moon, friend",
      "Time to fuck some bitches",
      "We're gonna make it",
    ];
    const randomCatch = phrases[Math.floor(Math.random() * phrases.length)];

    return {
      loading,
      page,
      setPage,
      toggleFaq,
      links,
      addLink,
      removeLink,
      addingLink,
      setAddingLink,
      addingLinkValue,
      addInput,
      randomCatch,
    };
  },
});
</script>
<style>
.rotate {
  animation: rotation 90s infinite linear;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
