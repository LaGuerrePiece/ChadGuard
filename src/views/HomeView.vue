<template>
	<div
		id="grandiv"
		class="h-[210px] relative w-full flex flex-col items-center shadow font-bold select-none"
		style="
			background-size: 330px;
			background-repeat: no-repeat;
			background-position: 160px 0px;
			z-index: 30;
		"
	>
		<button
			class="absolute top-[63px] right-[68px] text-transparent h-14 w-14"
			:class="{
				'cursor-help': !unlockPink,
				'cursor-default': unlockPink,
			}"
			@click="kikoue"
		>
			o
		</button>
		<div class="flex flex-col flex-grow self-start justify-center" style="padding-left: 25px">
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
				@click="setPageBlocklistOrSettings(false)"
			>
				<BanIcon class="w-6 h-6 mr-1" /> BLOCK LIST
			</div>
			<div
				class="flex items-center justify-center flex-grow default-text text-xl"
				:class="{
					'default-active-border': page,
					'default-hover cursor-pointer ': !page,
				}"
				@click="setPageBlocklistOrSettings(true)"
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
		<img src="../assets/soleilStakhanov.png" style="height: 100%; opacity: 0.3" />
	</div>
	<div v-if="loading" class="flex justify-center items-center flex-grow">
		<LoadingSpinner />
	</div>
	<div
		class="overflow-y-auto p-3 h-[19.8rem] bg-[#f5c7ee] z-10 tracking-widest select-none"
		v-else-if="!page"
	>
		<div class="flex flex-col gap-2">
			<div v-if="addingLink" class="flex">
				<div class="input border-2 rounded flex-grow font-sans">
					<input
						type="text"
						class="w-full h-full bg-transparent px-3 py-1 outline-none text-center"
						v-model="addingLinkValue"
						v-on:blur="addLink(addingLinkValue)"
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
			<div v-for="(link, index) in links" :key="link" class="flex">
				<div class="input border-2 rounded flex-grow font-sans">
					<input
						type="text"
						:value="link"
						class="w-full h-full bg-transparent blur-sm hover:blur-none transition-all duration-500 px-3 py-1 outline-none text-center"
						v-on:blur="editLink(index, $event)"
						v-on:keyup.enter="editLink(index, $event)"
					/>
				</div>
				<TrashIcon
					class="w-5 h-5 flex ml-1.5 mt-1 cursor-pointer"
					@click="removeLink(link)"
				/>
			</div>
		</div>
	</div>
	<div class="p-5 grow gap-3 bg-[#f5c7ee] z-10 flex flex-col tracking-[.05em] select-none" v-else>
		<div id="notrepromier" class="flex flex-row grow w-full gap-1 space-x-4">
			<div class="flex flex-col grow basis-0 border-solid">
				<h1
					class="text-left text-lg font-semibold tracking-wider ml-2 cursor-default"
					:class="{
						'cursor-help': !unlockPink,
						booncy: unlockPink == 1,
					}"
				>
					BLOCKING PAGE :
				</h1>
				<select
					class="align-middle default-border px-3 py-1 rounded w-full"
					v-model="blockingTypeSelected"
				>
					<option value="0">Chad</option>
					<option value="1" v-if="unlockPink">Chad (pink mode)</option>
					<option value="2">Video</option>
					<option value="3">Auto-Close</option>
				</select>
			</div>
			<div class="flex flex-col grow basis-0 border-solid">
				<h1 class="text-left text-lg font-semibold tracking-wider ml-2">AI FILTER :</h1>
				<select
					class="align-middle default-border px-3 py-1 rounded w-full"
					v-model="aiState"
				>
					<option value="true">Enabled</option>
					<option value="false">Disabled</option>
				</select>
			</div>
		</div>
		<div id="displayDayCounter" class="flex flex-row grow w-full gap-1 space-x-4">
			<div class="flex flex-col w-6/12 tooltip">
				<span v-if="visitCount < 3" class="tooltiptext"
					>This counter counts the days since you installed ChadGuard. <br />It is reset
					when you press the reset button or disable the extension.</span
				>
				<h1 class="text-left text-lg font-semibold tracking-wider ml-2">DAY COUNTER :</h1>
				<select
					class="align-middle default-border px-3 py-1 rounded w-full"
					v-model="dayCounterState"
				>
					<option value="true">Enabled</option>
					<option value="false">Disabled</option>
				</select>
			</div>
			<div class="flex flex-col w-6/12">
				<div class="grow" v-if="dayCounterState === 'true'">
					<h1 class="text-left text-lg font-semibold tracking-wider ml-2">
						{{ dayElapsed }} {{ nbJours }}
					</h1>
					<button
						v-on:click="resetDayCounter()"
						class="float-left text-center default-button default-border px-3 py-1 rounded w-6/12 h-[35px]"
					>
						RESET
					</button>
				</div>
			</div>
		</div>

		<div v-if="discordState === 'true'" id="connectDiscord" class="mb-3">
			<div class="flex flex-col grow gap-1">
				<h1 class="text-left text-lg font-semibold tracking-wider ml-2">
					DISCORD : CONNECTED AS {{ username }}
				</h1>
				<div class="flex flex-row grow gap-1 space-x-4">
					<button class="default-button grow basis-0 h-[35px]" v-on:click="logout()">
						DISCONNECT
					</button>
					<button class="default-button grow basis-0 opacity-0 cursor-default"></button>
				</div>
			</div>
		</div>
		<div v-else id="disconnectDiscord" class="mb-3">
			<div class="flex flex-col grow gap-1">
				<h1 class="text-left text-lg font-semibold ml-2">DISCORD :</h1>
				<div class="flex flex-row grow gap-1 space-x-4">
					<button class="default-button grow basis-0 h-[35px]" v-on:click="login()">
						Connect
					</button>
					<button class="default-button grow basis-0 opacity-0 cursor-default"></button>
				</div>
			</div>
		</div>
	</div>
	<TheFooter @toggleFaq="toggleFaq" />
</template>

<script lang="ts">
// Avoid this, temporary fix for Vue not finding chrome types when compiling
/* eslint-disable */

import { defineComponent, ref, watch } from 'vue';
import TheFooter from '@/components/TheFooter.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { PlusIcon } from '@heroicons/vue/outline';
import { TrashIcon } from '@heroicons/vue/outline';
import { CogIcon } from '@heroicons/vue/outline';
import { BanIcon } from '@heroicons/vue/solid';
import { XIcon } from '@heroicons/vue/outline';

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
		const page = ref(true);
		const addInput = ref();
		const addingLink = ref(false);
		const addingLinkValue = ref('');
		const links = ref<string[]>([]);
		const loading = ref(true);
		const dayCounterState = ref();
		const dayElapsed = ref();
		const discordState = ref();
		let username = ref();
		let nbJours = ref();
		let randomCatch = ref();
		let unlockPink = ref();
		let visitCount = ref();

		//determine if ai is filtering
		const aiState = ref();
		chrome.storage.sync.get(['aiFiltering'], (result) => {
			aiState.value = result.aiFiltering;
		});
		watch(aiState, () => {
			chrome.storage.sync.set({ aiFiltering: aiState.value });
		});

		//determine the blockingType
		const blockingTypeSelected = ref();
		chrome.storage.sync.get(['blockingType'], (result) => {
			blockingTypeSelected.value = result.blockingType;
		});
		watch(blockingTypeSelected, () => {
			chrome.storage.sync.set({
				blockingType: parseInt(blockingTypeSelected.value, 10),
			});
		});

		//determine if daycounter is activated
		chrome.storage.sync.get(['dayCounter'], (result) => {
			dayCounterState.value = result.dayCounter;
			if (dayCounterState.value == true) {
				dayCounterState.value = 'true';
			}
			if (dayCounterState.value == false) {
				dayCounterState.value = 'false';
			}
		});
		watch(dayCounterState, () => {
			if (dayCounterState.value == 'true') {
				chrome.storage.sync.set({ dayCounter: true });
			}
			if (dayCounterState.value == 'false') {
				chrome.storage.sync.set({ dayCounter: false });
			}
			chrome.runtime.sendMessage({ greeting: 'refreshDayCounter' });
		});

		// watch(username, () => {
		// 	if (username.value) chrome.storage.sync.set({ username: username.value });
		// });

		const setPageBlocklistOrSettings = (b: boolean) => {
			page.value = b;
		};

		const toggleFaq = () => {
			emit('toggleFaq');
			chrome.storage.sync.set({ lastPactDate: Date.now() });
		};

		const addLink = (url: string) => {
			if (url.length < 1) return;
			links.value.unshift(url);
			console.log(links.value);
			addingLinkValue.value = '';
			setAddingLink(false);
			chrome.storage.sync.set({ lastPactDate: Date.now() });
		};

		const removeLink = (url: string) => {
			let index = links.value.indexOf(url);
			if (index !== -1) {
				links.value.splice(index, 1);
			}
			chrome.storage.sync.set({ lastPactDate: Date.now() });
		};

		const editLink = (index: number, event: KeyboardEvent | FocusEvent) => {
			const value = (event.target as HTMLInputElement).value;
			links.value[index] = value;
		};

		const setAddingLink = (bool: boolean) => {
			addingLink.value = bool;
			if (!bool) addingLinkValue.value = '';
		};

		watch(addInput, () => {
			if (addInput.value) (addInput.value as HTMLInputElement).select();
		});

		function jourSingulierPluriel() {
			chrome.storage.sync.get(['dayElapsed'], (result) => {
				dayElapsed.value = result.dayElapsed;
				if (dayElapsed.value == 0 || dayElapsed.value == 1) {
					nbJours.value = ' day';
				}
				if (dayElapsed.value > 1) {
					nbJours.value = ' days';
				}
			});
		}

		chrome.storage.sync.get(['userBlocklist', 'dayElapsed', 'unlockPink'], (res) => {
			dayElapsed.value = res.dayElapsed;
			unlockPink.value = res.unlockPink ?? false;
			for (const key in res.userBlocklist) {
				links.value.push(res.userBlocklist[key]);
			}
			jourSingulierPluriel();
			loading.value = false;
		});

		watch(links.value, () => {
			if (loading.value) return;
			chrome.storage.sync.set({ userBlocklist: links.value });
		});

		//MODULE DE CONNECTION DISCORD

		checkLoginStatus();
		chrome.storage.sync.get(['unlockPink'], (res) => {
			unlockPink.value = res.unlockPink ?? false;
		});
		function kikoue() {
			console.log('KIKOUE, TU VEUX VOIR MA');
			unlockPink.value = 1;
			chrome.storage.sync.set({ unlockPink: 2, lastPactDate: Date.now() });
		}

		function checkLoginStatus() {
			chrome.storage.sync.set({ lastPactDate: Date.now() });
			chrome.storage.sync.get(['username', 'discordToken'], (data) => {
				if (data.discordToken) {
					if (!data.username) {
						getUsername(data.discordToken.access_token);
						chrome.storage.sync.get(['username'], (data) => {
							username.value = data.username;
						});
					}
					username.value = data.username;
					discordState.value = 'true';
					//L'UTILISATEUR EST CONNECTE, AFFICHER SON USERNAME ET "DECONNEXION"
				} else {
					//L'UTILISATEUR EST DECONNECTE, AFFICHER "CONNEXION"
				}
			});
		}

		function getUsername(token: string) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://discordapp.com/api/users/@me', true);
			xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			xhr.onload = function (e) {
				if (xhr.readyState === 4) {
					let usernameResponse = JSON.parse(xhr.responseText).username;
					if (usernameResponse === undefined) return;
					chrome.storage.sync.set({ username: usernameResponse });
					username.value = usernameResponse;
				}
			};
			xhr.send();
		}

		function login() {
			var url =
				'https://discordapp.com/api/oauth2/authorize?client_id=945674310461313087&redirect_uri=' +
				chrome.identity.getRedirectURL() +
				'&response_type=code&scope=identify%20guilds';
			chrome.identity.launchWebAuthFlow(
				{ url: url, interactive: true },
				function (res: string | undefined) {
					if (res) {
						var url = new URL(res);
						var code = url.searchParams.get('code');
						if (code) getToken(code as string);
						else {
							console.log('Erreur :', url.searchParams.get('error'));
							logout();
						}
					}
				}
			);
		}

		function getToken(code: string) {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://discordapp.com/api/oauth2/token', true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.onload = function (e) {
				if (xhr.readyState === 4) {
					chrome.storage.sync.set(
						{ discordToken: JSON.parse(xhr.responseText) },
						function () {
							checkLoginStatus();
						}
					);
				}
			};
			xhr.send(
				'client_id=945674310461313087&client_secret=tWD4eQ7yT7f6wUk56NN7SDljcPgetWGv&code=' +
					code +
					'&redirect_uri=' +
					chrome.identity.getRedirectURL() +
					'&scope=identify&grant_type=authorization_code'
			);
		}

		function logout() {
			chrome.storage.sync.remove(['discordToken', 'username'], function () {
				console.log('Déconnexion');
				discordState.value = 'false';
				checkLoginStatus();
			});
		}

		// BOUTON RESET

		const resetDayCounter = () => {
			chrome.storage.sync.set({ startDayCounter: Date.now() });
			nbJours.value = ' day';
			dayElapsed.value = 0;
			chrome.runtime.sendMessage({ greeting: 'refreshDayCounter' });
		};

		// PHRASES CHAD

		chrome.storage.local.get(['updatedHomePhrases'], (res) => {
			let updatedHomePhrases = res.updatedHomePhrases;
			if (updatedHomePhrases) {
				randomCatch.value =
					updatedHomePhrases[Math.floor(Math.random() * updatedHomePhrases.length)];
			} else {
				const phrases = [
					'I love you, brother',
					'What a bright day brother',
					"I'm proud of us",
					'To the moon, friend',
					'No tears, just dreams',
					"We're gonna make it",
				];
				randomCatch.value = phrases[Math.floor(Math.random() * phrases.length)];
			}
		});

		chrome.storage.sync.get(['visitCount'], (result) => {
			visitCount.value = result.visitCount;
		});

		return {
			loading,
			page,
			setPageBlocklistOrSettings,
			toggleFaq,
			links,
			addLink,
			removeLink,
			addingLink,
			setAddingLink,
			addingLinkValue,
			addInput,
			randomCatch,
			aiState,
			blockingTypeSelected,
			dayElapsed,
			dayCounterState,
			resetDayCounter,
			editLink,
			discordState,
			username,
			login,
			logout,
			nbJours,
			kikoue,
			unlockPink,
			visitCount,
		};
	},
});
</script>
<style>
#grandiv {
	background: url('../assets/noTearsJustDreams.png');
}

/* Tooltip container */
.tooltip {
	position: relative;
	display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
	visibility: hidden;
	width: 260px;
	bottom: 105%;
	left: 50%;
	margin-left: -90px; /* Use half of the width (120/2 = 60), to center the tooltip */
	background-color: #f0a6e4;
	color: black;
	text-align: center;
	padding: 5px;
	border-radius: 1rem;
	border-width: 2px;
	border-color: black;

	font-size: 0.8rem;
	letter-spacing: 0em;
	font-weight: 600;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
		'Segoe UI Symbol', 'Noto Color Emoji';
	/* Position the tooltip text - see examples below! */
	position: absolute;
	z-index: 1;
}

.tooltip .tooltiptext::after {
	content: '';
	position: absolute;
	top: 103%;
	left: 20%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #000000 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
	visibility: visible;
}
</style>
