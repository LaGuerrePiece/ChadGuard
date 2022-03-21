console.log('service worker running');

const urlUpdate = 'http://chadguard.pythonanywhere.com/data';
fetch(urlUpdate, {
	method: 'get',
})
	.then((res) => {
		res.json().then((res2) => {
			let raiponsse = res2;
			chrome.storage.local.set({ updatedQuotes: raiponsse.quotes });
			chrome.storage.local.set({ updatedVideos: raiponsse.videos });
			chrome.storage.local.set({ updatedHomePhrases: raiponsse.homePhrases });
			chrome.storage.local.set({ updatedDefaultBlocklist: raiponsse.defaultBlocklist });
			chrome.storage.local.set({ updatedConstants: raiponsse.constants });
		});
	})
	.catch((err) => {
		console.log('le serveur na pas été atteint. Erreur :', err.message);
	});

//Initialisation de la defaultBlocklist :
chrome.runtime.onInstalled.addListener(function (details) {
	chrome.storage.local.get(['defaultBlocklist'], function (result) {
		let defaultBlocklist = result.defaultBlocklist ?? [];
		const url = chrome.runtime.getURL('./defaultBlocklist.json');
		fetch(url)
			.then((response) => response.json())
			.then((json) => MiseAJour(json, defaultBlocklist));

		function MiseAJour(urls: string[], defaultBlocklist: string[]) {
			console.log(urls);
			urls.forEach((e) => {
				defaultBlocklist.push(e);
			});
			defaultBlocklist = [...new Set(defaultBlocklist)];
			chrome.storage.local.set({ defaultBlocklist: defaultBlocklist }, function () {});
		}
	});
	if (details.reason == 'install') {
		//A CHECKER
		chrome.storage.sync.set({
			blockingType: 0,
			visitCount: 0,
			aiFiltering: true,
			dayCounter: false,
			dayCounterValue: 0,
			dayElapsed: 0,
			startDayCounter: Date.now(),
			noseEggUnlock: false,
			lastPactDate: Date.now(),
			userBlocklist: ['www.turboshemale.com'],
		});
		console.log('INSTALLATION, PARAMETRES INITIALISES');
	}
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message == 'closeIt') {
		console.log('Received order to close you !');
		// @ts-expect-error I promise I will learn ts later
		chrome.tabs.remove(sender.tab.id);
	}

	if (request.greeting === 'refreshDayCounter') {
		chrome.storage.sync.get(['startDayCounter'], (result) => {
			let startDayCounter = result.startDayCounter;
			const oneDay = 1000 * 60 * 60 * 24;
			const oneMin = 1000 * 60;
			const oneSec = 1000;
			const dayElapsed = Math.round((Date.now() - startDayCounter) / oneSec);
			// console.log("startDayCounter", new Date(startDayCounter).toLocaleString());
			// console.log("COUNTER DAY DIFF", dayElapsed);
			chrome.storage.sync.set({ dayElapsed: dayElapsed });
		});

		chrome.storage.sync.get(['dayCounter'], (result: any) => {
			if (result.dayCounter === true) {
				chrome.storage.sync.get(['dayElapsed'], (res) => {
					let dayElapsed = res.dayElapsed;
					chrome.action.setBadgeBackgroundColor({ color: [51, 51, 153, 255] });
					chrome.action.setBadgeText({ text: String(dayElapsed) });
				});
			} else if (result.dayCounter === false) {
				chrome.action.setBadgeText({ text: '' });
			}
		});
		sendResponse({ farewell: '5/5 flubi' });
	}
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message == 'SendItToDiscord!') {
		const webHookUrl = 'http://chadguard.pythonanywhere.com/';
		const username = request.username;
		const url = request.url;

		let formData = new FormData();
		formData.append('name', username);
		formData.append('url', url);

		fetch(webHookUrl, {
			method: 'post',
			body: formData,
		}).then((e) => console.log(e, formData));
	}
});
