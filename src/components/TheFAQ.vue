<template>
  <div
    class="absolute w-full h-full flex justify-center items-center px-5 py-16 z-50"
  >
    <div
      class="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10"
      @click="closeCallback()"
    ></div>
    <div
      class="shadow relative default-bg w-full py-10 px-8 text-xl rounded z-20 overflow-y-auto max-h-full"
    >
      <XIcon
        class="w-4 h-4 absolute top-5 right-5 cursor-pointer"
        @click="closeCallback()"
      />
      <h1 class="text-4xl mb-3">F.A.Q.</h1>
      kikoue ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt kikoue ut labore et dolore kikoue magna aliqua kikoue.
      Ut enim ad kikoue minim kikoue veniam, quis kikoue nostrud kikoue
      exercitation kikoue ullamco kikoue laboris kikoue nisi kikoue ut aliquip
      kikoue ex kikoue ea kikoue commodo kikoue kikoue consequat. Duis aute
      kikoue irure kikoue dolor in reprehenderit in voluptate kikoue velit esse
      kikoue cillum dolore kikoue eu fugiat kikoue nulla pariatur. Excepteur
      kikoue sint kikoue occaecat kikoue cupidatat non kikoue proident kikoue,
      sunt in kikoue culpa kikoue qui officia kikoue deserunt kikoue mollit
      kikoue anim id kikoue est kikoue laborum kikoue. kikoue ipsum dolor sit
      amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt kikoue
      ut labore et dolore kikoue magna aliqua kikoue. Ut enim ad kikoue minim
      kikoue veniam, quis kikoue nostrud kikoue exercitation kikoue ullamco
      kikoue laboris kikoue nisi kikoue ut aliquip kikoue ex kikoue ea kikoue
      commodo kikoue kikoue consequat. Duis aute kikoue irure kikoue dolor in
      reprehenderit in voluptate kikoue velit esse kikoue cillum dolore kikoue
      eu fugiat kikoue nulla pariatur. Excepteur kikoue sint kikoue occaecat
      kikoue cupidatat non kikoue proident kikoue, sunt in kikoue culpa kikoue
      qui officia kikoue deserunt kikoue mollit kikoue anim id kikoue est kikoue
      laborum kikoue.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { XIcon } from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    XIcon,
  },
  props: {
    closeCallback: {
      type: Function,
      required: true,
    },
  },
});
</script>
