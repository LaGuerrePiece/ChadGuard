chrome.storage.local.get(['updatedQuotes'], (res) => {
	let defaultQuotes = [
		['woups', 'perdu'],
		['gro', 'pd'],
		['petio', 'pedo'],
	];
	console.log('dans la mierda');
	let quotes = res.updatedQuotes ?? defaultQuotes;
	let rand = Math.floor(Math.random() * quotes.length);
	document.getElementById('author').innerHTML = quotes[rand][0];
	document.getElementById('quote').innerHTML = quotes[rand][1];
});

chrome.storage.sync.get(['blockingType'], (res) => {
	let blockingType = res.blockingType;
	let randImage = Math.floor(Math.random() * 6);
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
