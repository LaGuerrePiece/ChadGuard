chrome.storage.local.get('updatedVideos', (res) => {
	let defaultVideos = ['43TmnIaL3n4', '1RvPbnZKKlQ', 'NX2ep5fCJZ8'];
	let videos = res.updatedVideos ?? ['qTN9bNaBCK8']; // METTRE DEFAULT VIDEO A LA PLACE
	console.log('videos', videos);
    console.log("res.updatedVideos", res.updatedVideos)
	let code = videos[Math.floor(Math.random() * videos.length)];
	document.body.innerHTML = `<iframe id="video" src="https://www.youtube.com/embed/${code}?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
});
//notWorking ;-; = ['7pHNEwskzQU', 'qUQxyasAcy8', 'm88vpMoaU4A']
