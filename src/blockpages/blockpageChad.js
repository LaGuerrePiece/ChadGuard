let quotes = [['woups', 'perdu'], ['gro', 'pd'], ['petio', 'pedo']];

chrome.storage.local.get(['updatedQuotes'], (res) => {
	updatedQuotes = res.updatedQuotes
	console.log('updatedQuotes', updatedQuotes)
	console.log('updatedQuotes[0]', updatedQuotes[0])
	if (updatedQuotes) {
		console.log('dans le chad ');
		let rand = Math.floor(Math.random() * updatedQuotes.length);
		document.getElementById('author').innerHTML = updatedQuotes[rand][0];
		document.getElementById('quote').innerHTML = updatedQuotes[rand][1];
	} else {
		let rand2 = Math.floor(Math.random() * quotes.length);
		document.getElementById('author').innerHTML = quotes[rand2][0];
		document.getElementById('quote').innerHTML = quotes[rand2][1];
	}
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