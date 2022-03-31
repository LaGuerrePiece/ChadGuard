<template>
	<div class="flex border-t-2 default-border py-1 text-base select-none z-50 bg-[#f5c7ee]">
		<a
			class="grow basis-0 default-border hover:underline cursor-pointer"
			@click="toggleFaq()"
      :class="{ booncy: firstVisit}"
			>FAQ</a
		>
		<a
			class="grow basis-0 border-l-2 border-r-2 default-border hover:underline"
			href="https://discord.gg/XBUmYd6FgP"
			target="_blank"
			>Discord</a
		>
		<a class="grow basis-0 hover:underline" href="https://github.com/LaGuerrePiece" target="_blank"
			>GitHub</a
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
let firstVisit = ref();

chrome.storage.sync.get(['visitCount'], (result) => {
	if (result.visitCount == 0) {
    firstVisit.value = true
	}
});

export default defineComponent({
	setup(props, { emit }) {
		const toggleFaq = () => {
			emit('toggleFaq');
		};

		return {
			toggleFaq,
      firstVisit
		};
	},
});
</script>
