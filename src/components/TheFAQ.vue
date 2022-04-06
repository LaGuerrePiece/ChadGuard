<template>
  <div class="absolute w-full h-full flex justify-center items-center px-5 py-16 z-50">
    <div
      class="absolute w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-10"
      @click="closeCallback"
    ></div>
    <div
      class="relative default-bg w-full py-10 px-8 text-xl rounded z-20 overflow-y-auto max-h-full"
    >
      <XIcon class="w-4 h-4 absolute top-5 right-6 cursor-pointer" @click="closeCallback" />
      <h1 class="text-4xl mb-5">F.A.Q.</h1>
      <div class="text-left flex flex-col gap-6">
        <div class="question-answer-group">
          <h2 class="question">How does it work ?</h2>
          <div class="answer">
            <p>
              ChadGuard's role is to put more steps between you and websites you want to avoid.
              Ultimately, it's just a helper tool and rely on an underlying decision.
            </p>
            <p>
              ChadGuard comes with a list of 1000+ blocked adult sites. Nonetheless, we recommend
              that on first use, you go to your history and add any website you want to avoid in the
              block site.
            </p>
            <p>We strongly advocate you allow ChadGuard to run in Incognito mode.</p>
          </div>
        </div>
        <div class="question-answer-group">
          <h2 class="question">How does it work ?</h2>
          <div class="answer">
            <p>
              ChadGuard's role is to put more steps between you and websites you want to avoid.
              Ultimately, it's just a helper tool and rely on an underlying decision.
            </p>
            <p>
              ChadGuard comes with a list of 1000+ blocked adult sites. Nonetheless, we recommend
              that on first use, you go to your history and add any website you want to avoid in the
              block site.
            </p>
            <p>We strongly advocate you allow ChadGuard to run in Incognito mode.</p>
          </div>
        </div>
        <div class="question-answer-group">
          <h2 class="question">Can I use it for non-porn website ?</h2>
          <p class="answer">Yes, any website you want, really.</p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">Can I add only a specific page from a website ?</h2>
          <p class="answer">Yes.</p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">Can I block a keyword ?</h2>
          <p class="answer">Yes, every page with that keyword in the URL will be blocked.</p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">How does the AI filter work ?</h2>
          <p class="answer">
            The AI Filter is a deeplearning AI model, based on the open source nsjwjs library.
          </p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">Does the AI Filter affect performance ?</h2>
          <p class="answer">
            Yes, on older devices, you may experience lagging and may want to disable AI Filter.
          </p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">How does the counter work ?</h2>
          <p class="answer">
            The counter counts the days since you installed ChadGuard. It is reset when you press
            the reset button or disable the extension.
          </p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">What does the Discord integration do ?</h2>
          <p class="answer">
            If you visit a forbidden URL, a bot will shout it out on the War Room Discord.
          </p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">What about privacy ?</h2>
          <p class="answer">
            We don't log anything, and don't know which websites you visit or add to the block list.
            Our code is open source. The only time word gets out is when you slip with the Discord
            integration on.
          </p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">Am I a Chad yet ?</h2>
          <p class="answer">Yes you are.</p>
        </div>
        <div class="question-answer-group">
          <h2 class="question">Any more ressources ?</h2>
          <div class="answer italic">
            <a href="https://youtu.be/DclqE-9vFgY" class="hover:underline" target="_blank"
              >Why porn changes the brain (short video)</a
            >
            <a href="https://youtu.be/7oFVOJf0TzY" class="hover:underline" target="_blank"
              >Science of NoFap (long video)</a
            >
            <a href="https://easypeasymethod.org" class="hover:underline" target="_blank"
              >The Easy Peasy Method (text)</a
            >
          </div>
        </div>
        <div class="question-answer-group">
          <h2 class="question">I spotted a bug / want to contribute</h2>
          <div class="answer">
            <p>
              Please shoot us a message on
              <a href="https://discord.gg/XBUmYd6FgP" class="underline" target="_blank"
                >Discord</a
              >
              or put an issue on
              <a href="https://github.com/LaGuerrePiece" class="underline" target="_blank"
                >GitHub</a
              >
              !
            </p>
            <p>Feel free to request a pull too !</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.question-answer-group {
  @apply flex flex-col gap-4;
}
.question {
  @apply font-bold text-lg font-main;
}
.answer {
  @apply flex flex-col gap-3 text-sm leading-5 font-main;
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
