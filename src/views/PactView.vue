<template>
	<div class="flex flex-col flex-grow gap-3 mt-6 select-none">
		<div class="text-6xl logo z-10" id="svg">CHADGUARD</div>
		<div class="mx-auto z-10 h-72">
			<div class="relative -top-12">
				<lottie-animation
					ref="anim"
					:animationData="wink"
					:loop="false"
					:autoPlay="false"
					@loopComplete="loopComplete"
					@complete="complete"
					@enterFrame="enterFrame"
				/>
			</div>
		</div>
		<div
			class="rotate"
			style="
				position: fixed;
				height: 2000px;
				width: 2000px;
				top: -750px;
				left: -805px;
				z-index: 1;
			"
		>
			<img src="../assets/petikokin.png" style="height: 100%; opacity: 0.35" />
		</div>
		<div v-if="loading" class="flex justify-center items-center flex-grow w-full">
			<LoadingSpinner />
		</div>
		<div v-else class="flex flex-col gap-2 z-10">
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
import { defineComponent, ref, watch, onMounted } from 'vue';
import TheFooter from '@/components/TheFooter.vue';
import { useRouter } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import wink from '../assets/wink.json';


export default defineComponent({
	components: {
		LoadingSpinner,
		TheFooter,
	},
	setup(props, { emit }) {
		const router = useRouter();
		const pact = '1';
		const pactRacc = 'I am not betraying our sacred pact, Chad bro';
		const phrase = ref('');
		const dateNow = new Date();
		const loading = ref(true);

		// VERIFIE SI C'EST LA PREMIERE VISITE OU SI L'UTILISATEUR A ENTRE LE MDP IL Y A - DE 2 MIN POUR SKIP

		chrome.storage.sync.get(['lastPactDate', 'visitCount'], (result) => {
			let lastPactDate = result.lastPactDate;
			let dateNow = Date.now();
			if (dateNow - lastPactDate < 180000) {
				chrome.storage.sync.set({ lastPactDate: dateNow });
				router.push('/home');
			}

			if (result.visitCount === 0) {
				// console.log('Première visite');
				chrome.storage.sync.set({ lastPactDate: Date.now() });
				router.push('/home');
			} else {
				// console.log('Visite numero', result.visitCount + 1);
			}
			let visitCountInc = result.visitCount + 1;
			chrome.storage.sync.set({ visitCount: visitCountInc });

			loading.value = false;
		});

		///////////////////////////////////////////////////////////////////////////////////////////////////

		const toggleFaq = () => {
			emit('toggleFaq');
		};

		const anim = ref();
		
		const loopComplete = () => {
			// console.log('loopComplete')
		};

		const complete = () => {
			router.push('/home');
		};

		const enterFrame = () => {
			// console.log(enterFrame)
		};

		onMounted(() => {
			watch(phrase, () => {
				if (phrase.value.toLowerCase() === pact.toLowerCase()) {
					chrome.storage.sync.set({ lastPactDate: Date.now() });
					anim.value.play();
				}
			});
		});

		return {
			phrase,
			pact,
			toggleFaq,
			loading,
			wink,
			anim,
			complete,
			enterFrame,
			loopComplete,
		};
	},
});
</script>
