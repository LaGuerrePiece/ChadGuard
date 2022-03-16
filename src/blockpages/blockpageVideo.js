let videos = ["43TmnIaL3n4", "1RvPbnZKKlQ", "NX2ep5fCJZ8"];
//notWorking ;-; = ['7pHNEwskzQU', 'qUQxyasAcy8', 'm88vpMoaU4A']
let code = videos[Math.floor(Math.random() * videos.length)];
document.body.innerHTML = `<iframe id="video" src="https://www.youtube.com/embed/${code}?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
