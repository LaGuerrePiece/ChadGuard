let quotesUpdate = [];

chrome.storage.local.get(['listUpdate'], (res) => {
	quotesUpdate = res[0];
});

let quotes = [
	['woups', 'perdu'],
];

let rand = Math.floor(Math.random() * quotes.length);
let randImage = Math.floor(Math.random() * 6);

console.log('rand', rand);
console.log('length', quotes.length);
console.log(quotes[rand]);

if (quotesUpdate[0]) {
	document.getElementById('author').innerHTML = quotesUpdate[0][rand][0];
	document.getElementById('quote').innerHTML = quotesUpdate[0][rand][1];
} else {
	document.getElementById('author').innerHTML = quotes[rand][0];
	document.getElementById('quote').innerHTML = quotes[rand][1];
}
chrome.storage.sync.get(['blockingType'], (res) => {
	console.log('CIBLE', res.blockingType);
	let blockingType = res.blockingType;
	if (blockingType == 1) {
		switch (randImage) {
			case 0:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall0r.jpg)';
				break;
			case 1:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall1r.jpg)';
				break;
			case 2:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall2r.jpg)';
				break;
			case 3:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall3r.jpg)';
				break;
			case 4:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall4r.jpg)';
				break;
			case 5:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall5r.jpg)';
				break;
			case 6:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall6r.jpg)';
				break;
		}
	} else {
		switch (randImage) {
			case 0:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall0.jpg)';
				break;
			case 1:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall1.jpg)';
				break;
			case 2:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall2.jpg)';
				break;
			case 3:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall3.jpg)';
				break;
			case 4:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall4.jpg)';
				break;
			case 5:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall5.jpg)';
				break;
			case 6:
				document.getElementById('imageid').style.backgroundImage =
					'url(./blockChads/wall6.jpg)';
				break;
		}
	}
});
