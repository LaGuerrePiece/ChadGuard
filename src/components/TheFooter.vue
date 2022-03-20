<template>
  <div class="flex border-t-2 default-border py-1 text-base z-50 bg-[#f5c7ee]">
    <a
      class="grow border-r-2 default-border hover:underline cursor-pointer"
      @click="toggleFaq()"
      >FAQ</a
    >
    <a
      class="grow border-r-2 default-border hover:underline"
      href="https://discord.gg/XBUmYd6FgP"
      target="_blank"
      >Discord</a
    >
    <a
      class="grow hover:underline"
      href="https://github.com/LaGuerrePiece"
      target="_blank"
      >GitHub</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const toggleFaq = () => {
      emit("toggleFaq");
    };

    return {
      toggleFaq,
    };
  },
});
</script>
