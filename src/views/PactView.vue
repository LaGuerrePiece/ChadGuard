<template>
  <div v-if="loading" class="flex justify-center items-center flex-grow">
    <LoadingSpinner />
  </div>
  <div class="flex flex-col flex-grow gap-3 mt-6">
    <div class="text-6xl logo">CHADGUARD</div>
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
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  components: {
    LoadingSpinner,
    TheFooter,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const pact = "123";
    const pactOriginal = "I am not betraying our sacred pact, Chad bro";
    const phrase = ref("");
    const dateNow = new Date();
    const loading = ref(true);

    // VERIFIE SI C'EST LA PREMIERE VISITE OU SI L'UTILISATEUR A ENTRE LE MDP IL Y A - DE 2 MIN POUR SKIP

    chrome.storage.sync.get(["visitCount"], (res) => {
      if (res.visitCount === 0) {
        console.log("Première visite");
        chrome.storage.sync.set({ lastPactDate: Date.now() });
        router.push("/home");
      } else {
        console.log("Visite numero", (res.visitCount + 1 ));
      }
      let visitCountInc = res.visitCount + 1;
      chrome.storage.sync.set({ visitCount: visitCountInc });
    });

    chrome.storage.sync.get(["lastPactDate"], (result) => {
      let lastPactDate = result.lastPactDate;
      let dateNow = Date.now();
      if (dateNow - lastPactDate < 120000) {
        chrome.storage.sync.set({ lastPactDate: dateNow });
        router.push("/home");
      }
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////



    loading.value = false;

    watch(phrase, () => {
      if (phrase.value.toLowerCase() === pact.toLowerCase()) {
        chrome.storage.sync.set({ lastPactDate: Date.now() });
        router.push("/home");
      }
    });

    const toggleFaq = () => {
      emit("toggleFaq");
    };

    return { phrase, pact, toggleFaq, loading };
  },
});
</script>
