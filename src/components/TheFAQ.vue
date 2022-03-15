<template>
  <div
    class="absolute w-full h-full flex justify-center items-center px-5 py-16 z-50"
  >
    <div
      class="absolute w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-10"
      @click="closeCallback()"
    ></div>
    <div
      class="shadow relative default-bg w-full py-10 px-8 text-xl rounded z-20 overflow-y-auto max-h-full"
    >
      <XIcon
        class="w-4 h-4 fixed top-[80px] left-[338px] cursor-pointer"
        @click="closeCallback()"
      />
      <h1 class="text-4xl mb-5">F.A.Q.</h1>
      <h2 class="question">How does it work ?</h2>
      <h3 class="reponse">
        ChadGuard's role is to put more steps between you and websites you want
        to avoid. Ultimately, it's just a helper tool and rely on an underlying
        decision.<br /><br />
        On first use, we recommend you go to your history and add any website
        you want to avoid in the block site. Then, delete them from your
        history. You can also try and think of any other website to ban. We
        strongly advocate you allow ChadGuard to run in Incognito mode.
      </h3>

      <h2 class="question">Can I use it for non-porn website ?</h2>
      <h3 class="reponse">Yes, any website you want, really.</h3>
      <h2 class="question">Can I add only a specific page from a website ?</h2>
      <h3 class="reponse">Yes.</h3>
      <h2 class="question">Can I block a keyword ?</h2>
      <h3 class="reponse">
        Yes, every page with that keyword in the URL will be blocked.
      </h3>
      <h2 class="question">How does the AI filter work ?</h2>
      <h3 class="reponse">
        The AI Filter is a deeplearning AI model, based on the open source
        nsjwjs library.
      </h3>
      <h2 class="question">Does the AI Filter affect performance ?</h2>
      <h3 class="reponse">
        Yes, on older devices especially, you may experience lagging and may
        want to disable AI Filter.
      </h3>
      <h2 class="question">How does the counter work ?</h2>
      <h3 class="reponse">
        The counter counts the days you fulfilled your engagement. It is reset
        when you disable the extension or press the reset button.
      </h3>
      <h2 class="question">What does the Discord integration do ?</h2>
      <h3 class="reponse">
        If you visit a forbidden URL, a bot will shout it out on the War Room
        Discord.
      </h3>
      <h2 class="question">What about privacy ?</h2>
      <h3 class="reponse">
        We don't log anything, and don't know which websites you visit or add to
        the block list. Our code is open source. The only time word gets out is
        when you slip with the Discord integration on.
      </h3>
      <h2 class="question">Am I a Chad yet ?</h2>
      <h3 class="reponse">Yes you are.</h3>
      <h2 class="question">Any more ressources ?</h2>
      <h3 class="reponse">
        WHY Porn Changes the Brain | Science of NoFap [SFW] Your Brain on Porn:
        How Internet porn affects the brain https://easypeasymethod.org/
      </h3>
      <h2 class="question"></h2>
      <h3 class="reponse"></h3>
    </div>
  </div>
</template>

<style>
.question {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: large;
  font-weight: 700;
  margin-bottom: 0.75rem /* 12px */;
}
.reponse {
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 1rem /* 16px */;
}
</style>

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
