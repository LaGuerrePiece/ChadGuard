<template>
	<div class="flex flex-col flex-grow gap-3 mt-6 select-none">
		<div class="text-6xl logo z-10" id="svg">CHADGUARD</div>
		<div class="mx-auto z-10 h-72">
			<div class="fixed top-14 left-4">
				<Vue3Lottie
					ref="anima"
					:animationData="wink"
					:height="'150%'"
					:width="'150%'"
					:autoPlay="false"
					:loop="false"
					:pauseOnHover="true"
				/>
			</div>
		</div>

		<!-- <img
			style="width: 250px"
			src="../assets/thereIsNoNeedToBeUpset.png"
			class="mx-auto pl-3 z-10"
		/> -->
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
			<!-- <div class="z-1000 min-w-full min-h-full" >
        <button id="svg" @click="foutre()">
          get started
        </button>
      </div> -->
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
import { Vue3Lottie } from 'vue3-lottie';

export default defineComponent({
	components: {
		LoadingSpinner,
		TheFooter,
		Vue3Lottie,
	},
	setup(props, { emit }) {
		const router = useRouter();
		const pact = '1';
		const pactRacc = 'I am not betraying our sacred pact, Chad bro';
		const phrase = ref('');
		const dateNow = new Date();
		const loading = ref(true);
		const anima = ref();

		// VERIFIE SI C'EST LA PREMIERE VISITE OU SI L'UTILISATEUR A ENTRE LE MDP IL Y A - DE 2 MIN POUR SKIP

		chrome.storage.sync.get(['lastPactDate', 'visitCount'], (result) => {
			let lastPactDate = result.lastPactDate;
			let dateNow = Date.now();
			if (dateNow - lastPactDate < 1200) {
				chrome.storage.sync.set({ lastPactDate: dateNow });
				router.push('/home');
			}

			if (result.visitCount === 0) {
				console.log('Première visite');
				chrome.storage.sync.set({ lastPactDate: Date.now() });
				router.push('/home');
			} else {
				console.log('Visite numero', result.visitCount + 1);
			}
			let visitCountInc = result.visitCount + 1;
			chrome.storage.sync.set({ visitCount: visitCountInc });

			loading.value = false;
		});

		///////////////////////////////////////////////////////////////////////////////////////////////////

		const toggleFaq = () => {
			emit('toggleFaq');
		};

		onMounted(() => {
			console.log(`the component is now mounted.`);

			console.log('anima', anima);
			console.log('anima.value', anima.value);
			console.log('anima.value.TEST', anima.value._.propsOptions);
			// anima.value.propsOptions.stop();
			// anima.value.propsOptions.pause();

			watch(phrase, () => {
				if (phrase.value.toLowerCase() === pact.toLowerCase()) {
					chrome.storage.sync.set({ lastPactDate: Date.now() });
					// anima.value.propsOptions.play();
					setTimeout(() => {
						router.push('/home');
					}, 1200);
				}
			});
		});

		return { phrase, pact, toggleFaq, loading, wink, anima };
	},
});
</script>
