<template>
  <div class="flex flex-col flex-grow gap-3 mt-6">
    <div class="text-6xl logo">THE CHAD PACT</div>
    <img
      style="width: 260px"
      src="https://i.imgur.com/WjsCGCG.png"
      class="mx-auto pl-3"
    />
    <div class="flex flex-col gap-2">
      <p class="text-xl">
        Access the preferences by typing <br />
        “<span class="select-none">{{ pact }}</span
        >”
      </p>
      <input
        type="text"
        class="h-full mx-8 px-3 py-1 mb-2 border-2 bg-[#A1B5F6] text-lg rounded-md outline-none default-border"
        placeholder="I believe in you"
        v-model="phrase"
        @paste.prevent
      />
    </div>
  </div>
  <TheFooter @toggleFaq="toggleFaq" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import TheFooter from "@/components/TheFooter.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TheFooter,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const pact = "I am not betraying our sacred pact, Chad bro";
    const phrase = ref("");

    watch(phrase, () => {
      if (phrase.value.toLowerCase() === pact.toLowerCase()) {
        router.push("/home");
      }
    });

    const toggleFaq = () => {
      emit("toggleFaq");
    };

    return { phrase, pact, toggleFaq };
  },
});
</script>
