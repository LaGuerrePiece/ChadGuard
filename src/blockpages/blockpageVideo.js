chrome.storage.local.get('updatedVideos', (res) => {
	let defaultVideos = [
		'uw3Pp1s5oMY',
		'KAuEXZ0ngIs',
		'PgU71nWCNeY',
		'4VQk85-HD_Y',
		'py-1Lxz-4f8',
		'rDGOxEAqqYs',
		'sdyxBP31UyY',
		'X2dFBn8hB14',
		'tYzMYcUty6s',
		'iEIqVq7EZqE',
		'43TmnIaL3n4',
		'1RvPbnZKKlQ',
		'NX2ep5fCJZ8',
		'iaL6MXxoEyc?start=16&',
	];
	let videos = res.updatedVideos ?? defaultVideos;
	let code = videos[Math.floor(Math.random() * videos.length)];
	document.body.innerHTML = `<iframe id="video" src="https://www.youtube.com/embed/${code}?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
});
// notWorking ;-; = ['7pHNEwskzQU', 'qUQxyasAcy8', 'm88vpMoaU4A', 'lBlfhqrFE', 'xSjSPQIZdQs', 'T0bFSL508YU', 'quOqoQQe6Fg',]