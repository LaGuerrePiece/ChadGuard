let tabUrl = location.href
let treeshold = 0.2
var webHookUrl = "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";

nsfwjs.load().then((loaded) => {
  model = loaded;
});


window.onload = async () => {
   const images = [...document.querySelectorAll('img')];
    for (const image in images) {
      try {
        console.log(await filterImage(images[image], 0.5));
        await sleep(50);
      } catch (err) {
        console.log(err);
        // Blank
      }
    }
}

async function filterImage(image, threshold) {
  const width = image.clientWidth;
  if (width < 50) {
    return {
      filter: false,
      reason: 'The image is too small',
    };
  }
  const newImg = new Image(200, 200);
  newImg.crossOrigin = 'anonymous';
  newImg.src = image.src;
  const result = await scanImage(newImg);

  
}


async function scanImage(element) {
  while (!model) {
    await sleep(1000);
  }
  return model.classify(element);
}