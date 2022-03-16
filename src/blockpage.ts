chrome.storage.sync.get(["blockingType"], function (result) {
  const blockingType = result.blockingType;
  let div = document.getElementById('blockingType')
  if (div) div.innerText =
    "blockingType " + blockingType + ".";
  if (blockingType === 0) {
    console.log("blockingtype 0");
  } else if (blockingType === 1) {
    console.log("blockingtype 1");
  } else if (blockingType === 2) {
    let videos = ["43TmnIaL3n4", "1RvPbnZKKlQ", "MwK9OznZ_ww"];
    //notWorking ;-; = ['7pHNEwskzQU', 'qUQxyasAcy8', 'm88vpMoaU4A']
    let code = videos[Math.floor(Math.random() * videos.length)];
    document.body.innerHTML = `<iframe id="video" src="https://www.youtube.com/embed/${code}?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  } else {
    console.log("this blockingtype is not defined");
  }
});
